import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { token } from "../config";
import { toast } from "react-toastify";

const Room = () => {

const wsRef = useRef<WebSocket | null>(null)

  const { state: message } = useLocation();

  useEffect(() => {

    if(wsRef.current) return
    const ws = new WebSocket(`ws://localhost:3000?token=${token}`)
wsRef.current = ws 
    ws.onopen = (message) => {
      ws.send(JSON.stringify(message))
      
    }
ws.onmessage = (message) => {
  toast.success(message.data)
}

ws.onclose = () => {
  console.log('disconnected from server')
}
    return () => {
  if(ws.readyState === WebSocket.OPEN){
    ws.close()
  }
    }
  },[])

  return (
    <div className="bg-black h-screen text-white">
     hello 
    </div>
  );
};

export default Room;
