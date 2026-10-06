// Extrae fotogramas de un vídeo. Uso: grab <in> <outDir> <prefijo> <anchoMax> <t1> [t2 ...]
import Foundation
import AVFoundation
import AppKit

let a = CommandLine.arguments
guard a.count >= 6 else { FileHandle.standardError.write("args\n".data(using:.utf8)!); exit(1) }
let asset = AVAsset(url: URL(fileURLWithPath: a[1]))
let outDir = a[2], prefix = a[3]
let maxW = Double(a[4]) ?? 800
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero
gen.maximumSize = CGSize(width: maxW, height: maxW * 4)

for t in a[5...] {
  guard let secs = Double(t) else { continue }
  let time = CMTime(seconds: secs, preferredTimescale: 600)
  do {
    let cg = try gen.copyCGImage(at: time, actualTime: nil)
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.86]) else { continue }
    let name = "\(prefix)-\(t).jpg"
    try data.write(to: URL(fileURLWithPath: outDir).appendingPathComponent(name))
    print("OK \(name) \(cg.width)x\(cg.height)")
  } catch { print("FAIL t=\(t): \(error.localizedDescription)") }
}
