"use client";

import HandGestureDetector from "@/components/HandGestureDetector";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
      <h1 className="text-3xl mb-4">Test Gesture</h1>
      <HandGestureDetector
        onGesture={(gesture) => {
          console.log("Gesture détecté :", gesture);
        }}
      />
    </div>
  );
}
