import React, { useState, useRef, useEffect } from 'react';
import './index.less';
import { CheckCircleOutlined, CloseCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { t } from 'i18next';

const Captcha = () => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [coverBG, setCoverBG] = useState(0);
    const [textColor, setTextColor] = useState('#000');
    const [sliderText, setSliderText] = useState(0);
    const [showText, setShowText] = useState(0);
    const sliderRef = useRef<HTMLElement>(null);
    let slider

    // 获取滑块的最大偏移量
    const maxOffset = 200
    // 标记是否验证成功
    let isSuccess = false;
    // 记录鼠标初始按下滑块时的位置
    let startX = 0;

    const handleSliderMove = (e) => {
        // 计算出滑块的左侧不断变化的距离
        let changeLeft = e.clientX - startX;
        // console.log(changeLeft);
        // 对滑块偏移位置进行限制
        if (changeLeft < 0) {
            changeLeft = 0;
        }
        if (changeLeft > maxOffset) {
            changeLeft = maxOffset;
            isSuccess = true;
            // 验证成功的回调
            successEvent()
        }
        // 进行赋值
        setSliderPosition(changeLeft);
        setCoverBG(changeLeft)
    };

    // 成功的函数，在此进行验证成功的逻辑
    function successEvent() {
        setShowText(1);
        setTextColor('#fff');
        setSliderText(1);
        console.log('验证成功');
        slider!.removeEventListener('mousedown', handleSliderDown);
        slider!.removeEventListener('mousemove', handleSliderMove);
        slider!.removeEventListener('mouseup', handleSliderUp);
        // TODO: 验证成功的逻辑
    }

    const handleSliderUp = (e) => {
        // 松开时没有验证成功，滑块退回起点
        if (isSuccess == false) {
            const changeLeft = e.clientX - startX;
            setSliderText(-1)
            setShowText(-1)
            let sliderPositionTemp = changeLeft
            let coverBGTemp = changeLeft

            const interVal = sliderPositionTemp
            setTimeout(() => {
                setInterval(() => {
                    if (sliderPositionTemp <= 0) {
                        clearInterval(interVal);
                        return;
                    }
                    if(sliderPositionTemp < 20) {
                        sliderPositionTemp = 0
                        coverBGTemp = 0
                    }
                    else {
                        sliderPositionTemp -= 20
                        coverBGTemp -= 20
                    }
                    setSliderPosition(sliderPositionTemp)
                    setCoverBG(coverBGTemp)
                }, sliderPositionTemp)
                setShowText(2)
                setSliderText(0)
            }, 1000)
        }
        // 同时移除移动和松开的事件，否则会影响二次滑动
        slider!.removeEventListener('mousemove', handleSliderMove);
        slider!.removeEventListener('mouseup', handleSliderUp);
    };

    const handleSliderDown = (e) => {
        startX = e.clientX;
        slider!.addEventListener('mousemove', handleSliderMove);
        slider!.addEventListener('mouseup', handleSliderUp);
    }

    useEffect(() => {
        const tempSlider = document.querySelector('.slider') as HTMLElement;
        slider = tempSlider;
        slider!.addEventListener('mousedown', handleSliderDown);
    }, [])

    return (
        <div className="captcha-container">
            <div className="cover-bg" style={{ width: `${coverBG}px` }} />
            <div className='text' style={{ color: `${textColor}` }}>
                {
                    showText == 0 && (t('common.slider'))
                }
                {
                    showText == 2 && (t('common.sliderAgain'))
                }
                {
                    showText == 1 && (t('common.sliderPass'))
                }
                {
                    showText == -1 && (t('common.sliderError'))
                }
            </div>
            <div
                id='slider'
                className="slider"
                style={{ left: `${sliderPosition}px` }}
                ref={sliderRef}
            >
                <span>
                    {
                        sliderText == 0 && (<DoubleRightOutlined />)
                    }
                    {
                        sliderText == 1 && (<CheckCircleOutlined />)
                    }
                    {
                        sliderText == -1 && (<CloseCircleOutlined />)
                    }
                </span>
            </div>
        </div>
    );
};

export default Captcha;