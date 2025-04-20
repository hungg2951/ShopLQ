"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";

interface ResendProps {
  onResend: () => void;
}

const ResendCodeButton = ({ onResend }: ResendProps) => {
  const [remainingTime, setRemainingTime] = useState(120); // 2 phút
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsCounting(false);
    }

    return () => clearInterval(timer);
  }, [isCounting, remainingTime]);

  const handleResend = () => {
    onResend(); // Gửi lại mã
    setRemainingTime(120); // reset 2 phút
    setIsCounting(true);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <div className="mt-4 text-center">
      {isCounting ? (
        <p className="text-gray-500">
          Bạn có thể gửi lại sau <b>{formatTime(remainingTime)}</b>
        </p>
      ) : (
        <Button type="link" onClick={() => handleResend()}>
          Gửi lại mã
        </Button>
      )}
    </div>
  );
};

export default ResendCodeButton;
