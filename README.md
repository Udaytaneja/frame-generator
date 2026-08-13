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
