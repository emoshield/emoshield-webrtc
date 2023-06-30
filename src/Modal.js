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
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
    zIndex: 99999,
    opacity: 0,
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
      <h1>사진 팝업</h1>

      {/* 모달 컴포넌트 */}
      {modalIsOpen && (
        <div
          style={{
            ...modalStyles.overlay,
            ...(modalIsOpen && modalStyles.open),
          }}
          onClick={handleOverlayClick}
        >
          <div style={modalStyles.content}>
            <h2>팝업 사진</h2>
            <img
              src="사진_경로"
              alt="팝업 사진"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                cursor: 'pointer',
              }}
              onClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;