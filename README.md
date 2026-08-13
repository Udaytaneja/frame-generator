# HH Goa 2026 — Frame Generator ⚡

> Create your HH Goa 2026 builder identity in seconds.

A browser-based identity frame generator designed for **HH Goa 2026**. Users upload a portrait, the application verifies that a face is present, intelligently positions the photograph, and generates a polished **1080 × 1080 HH Goa 2026 branded frame** directly in the browser.

The experience combines an editorial visual system inspired by the HH Goa aesthetic with real-time WebGL construction graphics, client-side face detection, face-aware cropping, and Canvas-based image generation.

---

## 🚀 Live Demo

**Live Platform:**  
https://frame-generator.onrender.com

**Source Code:**  
https://github.com/Udaytaneja/frame-generator

---

# ✨ What Is HH Goa Frame Generator?

HH Goa Frame Generator is a lightweight web application that turns a user's portrait into a ready-to-share HH Goa 2026 builder identity.

Instead of asking users to manually edit images in external software, the platform handles the complete workflow:

```text
Upload Photo
     ↓
Face Detection
     ↓
Face-Aware Composition
     ↓
Preview
     ↓
Generate Frame
     ↓
1080 × 1080 PNG
     ↓
Download / Share

🎯 Problem

Community events and hackathons often provide branded frames that require users to:

Download an image template
Open an external image editor
Manually crop their photograph
Position the photograph
Adjust the composition
Export the final image
Upload it again to social media

This creates unnecessary friction.

For an event such as HH Goa 2026, the goal is to make identity creation instant, branded, and shareable.

💡 Solution

HH Goa Frame Generator turns the entire process into a simple guided workflow.

User journey
Upload a portrait.
The application detects whether a face is present.
The detected face is used to improve the crop position.
The user previews the composition.
The application generates the final frame locally.
A production-ready 1080 × 1080 PNG is created.
The user can download the image.
Users can open X with a pre-filled HH Goa caption.
Supported mobile browsers can share the generated image through the native sharing system.
⭐ USP — What Makes It Different?
1. Face-Aware Composition

The application doesn't blindly place the uploaded image inside a square.

It first performs browser-side face detection using MediaPipe BlazeFace.

The detected face is then used to influence the square cover crop.

This helps prevent situations where:
Normal crop:
┌─────────────┐
│             │
│       👤    │  ← face pushed out
│             │
└─────────────┘

Face-aware crop:
┌─────────────┐
│    👤       │
│             │
│             │
└─────────────┘

The system preserves the original image proportions and avoids artificial stretching

2. Client-Side Image Processing

The uploaded photograph does not need to be sent to a project backend for the core frame-generation process.

The browser handles:

Image decoding
Face detection
Crop calculation
Frame composition
Canvas rendering
PNG generation

This makes the application lightweight and reduces unnecessary infrastructure.

Note: MediaPipe's WASM/model resources are fetched from external CDN/model-hosting URLs when required.

3. Real 1080 × 1080 Output

The generated result is not simply a screenshot of the webpage.

The application renders the final composition using HTML Canvas and produces an actual:

1080 × 1080 PNG

with the filename:

hh-goa-2026-frame.png

This makes the output suitable for social sharing and downloading.

4. Editorial Visual Identity

The interface deliberately avoids looking like a generic AI-generated SaaS dashboard.

The visual language combines:

HH Goa-inspired emerald
Sunshine yellow
Hype pink
Vintage cream
Editorial typography
Sharp geometric borders
Technical metadata
Collage-style composition
Tropical visual elements
Construction-inspired graphics

Typography uses:

Playfair Display — editorial/display typography
Space Grotesk — interface and supporting text
IBM Plex Mono — technical labels and metadata
5. Live Construction Shader

The application includes a custom WebGL construction shader.

The shader creates an animated environment containing:

Constructing yellow geometric lines
Emerald background
Grain
Scanline atmosphere
Time-based animation
Responsive resizing
Reduced-motion handling
CSS fallback

This gives the platform a distinctive "building in progress" identity instead of a static background.

🧩 Core Features
📸 Smart Photo Upload

Users can upload a portrait directly from their device.

The application handles:

Image loading
Image decoding
Unsupported image handling
Invalid image handling
Oversized/processing errors
👤 Face Detection

Powered by:

MediaPipe Tasks Vision / BlazeFace

The detector runs in the browser.

No-face images

If the uploaded image doesn't contain a detectable face, the user receives a dedicated error state:
OOPS!

We couldn't find a face in this photo.

TRY ANOTHER PHOTO

This prevents unsuitable images from entering the generation workflow.

👥 Multiple Face Handling

If multiple faces are detected, the application selects the primary/largest detected face for composition.

This keeps the generation workflow simple for the user.

🎯 Face-Aware Smart Crop

The image is cropped into the required square composition while attempting to keep the detected face in a sensible position.

The system avoids:

Image stretching
Aspect-ratio distortion
Extreme zoom
Unnecessary pixel manipulation
🖼️ Preview

Before generation, users can inspect how their photograph will look inside the HH Goa 2026 composition.

⚡ Frame Generation

The application renders the final frame through HTML Canvas.

Output:

1080 × 1080 PNG

The generated frame is retained in browser memory so it can be downloaded or shared.

⬇️ Download

Users can download:

hh-goa-2026-frame.png

directly to their device.

𝕏 Share on X

The platform provides an X sharing workflow.

Desktop

Desktop browsers open an X post intent with the caption pre-filled:

Just framed my builder identity for HH Goa 2026 ⚡

#FrameInGoa

The generated PNG can be downloaded separately using the Download PNG action.

This is intentional because X's standard web intent does not provide a reliable mechanism for attaching an arbitrary browser-generated Blob/File.

Mobile

Where supported, mobile browsers can use the native Web Share API to share the generated PNG together with the caption.

If file sharing isn't supported, the application falls back to downloading the PNG and opening the X intent.

🔐 Privacy & Data Handling

The core image-generation workflow is browser-side.

The application does not require:

User accounts
Authentication
A database
A custom image-processing backend
Server-side image storage

The uploaded photograph is processed locally by the browser for face detection, cropping, and frame generation.

The application does load MediaPipe runtime/model assets from external URLs when face detection is initialized.

🏗️ System Architecture:


🔒 Security & Infrastructure

The application intentionally keeps the architecture lightweight.

There is currently no:

Backend server
Database
Authentication layer
User account system
Image storage service
API key requirement

This makes the application suitable for a simple event-facing utility where the primary operation is client-side image composition.
🧭 Future Improvements

Potential future extensions include:

Additional HH Goa frame themes
More advanced face positioning
Optional user-selected crop positioning
Additional social sharing integrations
Offline/self-hosted MediaPipe model assets
Progressive Web App support
Event-specific frame campaigns
Analytics with privacy-preserving instrumentation
Direct device camera capture
More export formats
🏆 Project Highlights
✓ Browser-based face detection
✓ Face-aware image composition
✓ Client-side image processing
✓ Real 1080 × 1080 PNG generation
✓ Canvas-based frame renderer
✓ WebGL construction shader
✓ Responsive editorial UI
✓ Mobile Web Share support
✓ Desktop X intent integration
✓ No backend required
✓ No database required
✓ Static deployment


