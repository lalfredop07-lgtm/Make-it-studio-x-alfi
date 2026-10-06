// Transcodificador H.264 con control explícito de bitrate (AVAssetReader/Writer).
// Uso: transcode <in> <out> <anchoDestino> <kbpsVideo> <kbpsAudio|0 = sin audio>
import Foundation
import AVFoundation

func fail(_ m: String) -> Never { FileHandle.standardError.write(("ERROR: " + m + "\n").data(using: .utf8)!); exit(1) }

let a = CommandLine.arguments
guard a.count == 6 else { fail("args: <in> <out> <width> <vkbps> <akbps>") }
let inURL = URL(fileURLWithPath: a[1])
let outURL = URL(fileURLWithPath: a[2])
guard let targetW = Double(a[3]), let vkbps = Int(a[4]), let akbps = Int(a[5]) else { fail("args numéricos inválidos") }

try? FileManager.default.removeItem(at: outURL)

let asset = AVAsset(url: inURL)
guard let vTrack = asset.tracks(withMediaType: .video).first else { fail("sin pista de vídeo") }

let natural = vTrack.naturalSize
let transform = vTrack.preferredTransform
let displayed = natural.applying(transform)
let dispW = abs(displayed.width), dispH = abs(displayed.height)
let scale = min(1.0, targetW / dispW)
func even(_ v: Double) -> Int { let n = Int((v * 0.5).rounded()) * 2; return max(2, n) }
let outW = even(Double(natural.width) * scale)
let outH = even(Double(natural.height) * scale)
let fps = vTrack.nominalFrameRate > 0 ? vTrack.nominalFrameRate : 30

guard let reader = try? AVAssetReader(asset: asset), let writer = try? AVAssetWriter(outputURL: outURL, fileType: .mp4) else { fail("no se pudo crear reader/writer") }
writer.shouldOptimizeForNetworkUse = true   // moov al principio: empieza a reproducir antes

let vOut = AVAssetReaderTrackOutput(track: vTrack, outputSettings: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange
])
vOut.alwaysCopiesSampleData = false
reader.add(vOut)

let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: outW,
  AVVideoHeightKey: outH,
  AVVideoScalingModeKey: AVVideoScalingModeResizeAspect,
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: vkbps * 1000,
    AVVideoMaxKeyFrameIntervalKey: Int(fps * 2),
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoAllowFrameReorderingKey: true,
    AVVideoExpectedSourceFrameRateKey: Int(fps),
  ] as [String: Any],
])
vIn.expectsMediaDataInRealTime = false
vIn.transform = transform
writer.add(vIn)

var aOut: AVAssetReaderAudioMixOutput?
var aIn: AVAssetWriterInput?
if akbps > 0, let aTrack = asset.tracks(withMediaType: .audio).first {
  let o = AVAssetReaderAudioMixOutput(audioTracks: [aTrack], audioSettings: [
    AVFormatIDKey: kAudioFormatLinearPCM,
    AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false,
    AVLinearPCMIsBigEndianKey: false, AVLinearPCMIsNonInterleaved: false,
  ])
  reader.add(o); aOut = o
  let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [
    AVFormatIDKey: kAudioFormatMPEG4AAC,
    AVNumberOfChannelsKey: 2, AVSampleRateKey: 44100,
    AVEncoderBitRateKey: akbps * 1000,
  ])
  i.expectsMediaDataInRealTime = false
  writer.add(i); aIn = i
}

guard reader.startReading() else { fail("startReading: \(reader.error?.localizedDescription ?? "?")") }
guard writer.startWriting() else { fail("startWriting: \(writer.error?.localizedDescription ?? "?")") }
writer.startSession(atSourceTime: .zero)

let group = DispatchGroup()
func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ label: String) {
  group.enter()
  input.requestMediaDataWhenReady(on: DispatchQueue(label: "pump.\(label)")) {
    while input.isReadyForMoreMediaData {
      guard reader.status == .reading, let sb = output.copyNextSampleBuffer() else {
        input.markAsFinished(); group.leave(); return
      }
      if !input.append(sb) { input.markAsFinished(); group.leave(); return }
    }
  }
}
pump(vIn, vOut, "v")
if let i = aIn, let o = aOut { pump(i, o, "a") }

group.wait()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()

if writer.status != .completed { fail("writer: \(writer.error?.localizedDescription ?? "?")") }
let bytes = (try? FileManager.default.attributesOfItem(atPath: outURL.path)[.size] as? Int) ?? 0
print("OK \(outURL.lastPathComponent)  \(outW)x\(outH)  \(String(format: "%.2f", Double(bytes ?? 0)/1_048_576)) MB")
