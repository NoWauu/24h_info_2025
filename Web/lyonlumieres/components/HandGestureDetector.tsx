"use client";

import { useEffect, useRef } from "react";
declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}
export default function HandGestureDetector({
  onGesture,
}: {
  onGesture: (gesture: "open" | "fist" | "thumbs_up") => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let camera: any;

    const load = async () => {
      // @ts-ignore
      const Hands = window.Hands;
      // @ts-ignore
      const Camera = window.Camera;

      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults((results: any) => {
        const landmarks = results.multiHandLandmarks?.[0];
        if (!landmarks) return;

        const isFingerUp = (tip: number, pip: number) =>
          landmarks[tip].y < landmarks[pip].y;

        const fingers = {
          thumb: landmarks[4].x < landmarks[3].x,
          index: isFingerUp(8, 6),
          middle: isFingerUp(12, 10),
          ring: isFingerUp(16, 14),
          pinky: isFingerUp(20, 18),
        };

        if (
          fingers.thumb &&
          fingers.index &&
          fingers.middle &&
          fingers.ring &&
          fingers.pinky
        ) {
          onGesture("open");
        } else if (
          !fingers.thumb &&
          !fingers.index &&
          !fingers.middle &&
          !fingers.ring &&
          !fingers.pinky
        ) {
          onGesture("fist");
        } else if (
          fingers.thumb &&
          !fingers.index &&
          !fingers.middle &&
          !fingers.ring &&
          !fingers.pinky
        ) {
          onGesture("thumbs_up");
        }
      });

      if (videoRef.current) {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });
        await navigator.mediaDevices.getUserMedia({ video: true });
        camera.start();
      }
    };

    if (typeof window !== "undefined" && window.Hands && window.Camera) {
      load();
    } else {
      const interval = setInterval(() => {
        if (window.Hands && window.Camera) {
          clearInterval(interval);
          load();
        }
      }, 100);
    }

    return () => {
      camera?.stop?.();
    };
  }, [onGesture]);

  return <video ref={videoRef} className="hidden" autoPlay muted />;
}
