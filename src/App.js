// import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer";
// import "./App.css";

// const ConnectionStatus = {
//   OFFERING: 0,
//   RECEIVING: 1,
//   CONNECTED: 2,
// };

// export const VideoCall = () => {
//   const videoSelf = useRef(null);
//   const videoCaller = useRef(null);
//   const [connectionStatus, setConnectionStatus] = useState(null);
//   const [offerSignal, setOfferSignal] = useState();
//   const [simplePeer, setSimplePeer] = useState();
//   const webSocketConnection = useRef(null);

//   useEffect(() => {
//     webSocketConnection.current = new WebSocket("ws://develop.api.emoshield.link/videochat");

//     webSocketConnection.current.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     webSocketConnection.current.onmessage = (message) => {
//       const payload = JSON.parse(message.data);
//       if (payload?.type === "offer") {
//         setOfferSignal(payload);
//         setConnectionStatus(ConnectionStatus.RECEIVING);
//       } else if (payload?.type === "answer") simplePeer?.signal(payload);
//     };

//     return () => {
//       // Clean up the WebSocket connection when the component unmounts
//       if (webSocketConnection.current) {
//         webSocketConnection.current.close();
//       }
//     };
//   }, [simplePeer]);

//   const sendOrAcceptInvitation = (isInitiator, offer) => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
//       const video = videoSelf.current;
//       video.srcObject = mediaStream;
//       video.play();

//       const sp = new SimplePeer({
//         trickle: false,
//         initiator: isInitiator,
//         stream: mediaStream,
//       });

//       if (isInitiator) setConnectionStatus(ConnectionStatus.OFFERING);
//       else offer && sp.signal(offer);

//       sp.on("signal", (data) => {
//         if (webSocketConnection.current.readyState === WebSocket.OPEN) {
//           webSocketConnection.current.send(JSON.stringify(data));
//         } else {
//           console.log("WebSocket connection is not open yet. Data not sent.");
//         }
//       });
//       sp.on("connect", () => setConnectionStatus(ConnectionStatus.CONNECTED));
//       sp.on("stream", (stream) => {
//         const video = videoCaller.current;
//         video.srcObject = stream;
//         video.play();
//       });
//       setSimplePeer(sp);
//     });
//   };

//   return (
//     <div className="web-rtc-page">
//       {connectionStatus === null && <button onClick={() => sendOrAcceptInvitation(true)}>CALL</button>}
//       {connectionStatus === ConnectionStatus.OFFERING && <div className="loader"></div>}
//       {connectionStatus === ConnectionStatus.RECEIVING && (
//         <button onClick={() => sendOrAcceptInvitation(false, offerSignal)}>ANSWER CALL</button>
//       )}
//       <div className="video-container">
//         <video ref={videoSelf} className="video-block" />
//         <video ref={videoCaller} className="video-block" />
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// 모달 스타일 설정
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 블러 효과를 위한 색상
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease',
  },
  content: {
    position: 'relative',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '8px',
    padding: '16px',
    zIndex: 0,
    opacity: 100,
    transition: 'opacity 0.3s ease',
  },
  open: {
    opacity: 1,
  },
};

// App 컴포넌트
const App = () => {
  // 모달 열림 상태를 관리하는 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // 3초 후에 모달을 열기 위해 setTimeout 함수 사용
    const timer = setTimeout(() => {
      setModalIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  }, []);

  // 모달 닫기 함수
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 사진 클릭 시 모달 닫기
  const handleImageClick = () => {
    closeModal();
  };

  // 모달 외부 클릭 시 모달 닫기
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <h1>접속 3초 후에 모달이 팝업됩니다.</h1>

      {/* 모달 컴포넌트 */}
      {modalIsOpen && (
        <div
          style={{
            ...modalStyles.overlay,
            ...(modalIsOpen && modalStyles.open),
          }}
          onClick={handleOverlayClick}
        >
          <div>
            <img
              src="alert_modal.png"
              alt="팝업 사진"
              style={modalStyles.content}
              onClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
