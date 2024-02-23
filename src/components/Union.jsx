import { useEffect, useRef } from "react"
import { apiCharacterUnionRaider } from "../js/api";
import { useQuery } from "react-query";

const UnionSlot = ({stat, occupied}) => {
    return(
        <div className="basis-1/2 bg-[#3e4d5a] p-2 space-y-2 text-[12px] text-white-color rounded-md">
            <p className="font-semibold">{stat ? `공격대원 효과` : `공격대 점령 효과`}</p>
            <div id="scroll" className="h-48 text-gray-300
            overflow-y-scroll">
            {stat && stat.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            {occupied && occupied.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            </div>
        </div>
    )
}

export default function Union({ocid, union}) {
    const { data:dataGuildMemberUnionRaider, isLoading:isLoadingGuildMemberUnionRaider } = 
    useQuery(["getGuildMemberUnionRaider", ocid && { ocid : ocid }], apiCharacterUnionRaider, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    let unionBlock; // 배치 블럭
    let innerStat; // 시계방향 배치
    let unionStat; // 공격대원 효과
    let unionOccupied; // 공격대 점령 효과
    if(!isLoadingGuildMemberUnionRaider) {
        unionBlock = dataGuildMemberUnionRaider.union_block;
        innerStat = dataGuildMemberUnionRaider.union_inner_stat;
        unionStat = dataGuildMemberUnionRaider.union_raider_stat;
        unionOccupied = dataGuildMemberUnionRaider.union_occupied_stat;
    }
    // console.log(unionBlock);
    // console.log(innerStat);
    // console.log(dataGuildMemberUnionRaider);
    // console.log(union);

    const canvasRef = useRef(null);
    const COLS = 22;
    const ROWS = 20;
    const BLOCK_SIZE = 14;
    const BORDER_SIZE = 1;
    const START_POINT_X = 11 * (BLOCK_SIZE + BORDER_SIZE);
    const START_POINT_Y = 9 * (BLOCK_SIZE + BORDER_SIZE);

    const LINE_WIDTH = 2;
    const LINE_COLOR = "#9CA3AF";
    // 배경
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width =  COLS * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
        canvas.height = ROWS * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
        
        const context = canvas.getContext("2d");
        for(let x = 0; x < COLS; x++) {
            for(let y = 0; y < ROWS; y++){
                context.fillStyle = "#2c3239"
                context.fillRect(
                    x * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    y * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    BLOCK_SIZE, 
                    BLOCK_SIZE)
            }
        }

        // 중간 상자
        for(let x = 5; x < 5 + 12; x++) {
            for(let y = 5; y < 5 + 10; y++) {
                // 투명한 색상 설정
                context.fillStyle = "rgba(255, 255, 255, 0.2)";
                // 보더 색상 설정
                // context.strokeStyle = LINE_COLOR;
                // 상자 그리기
                context.fillRect( //strokeRect
                    x * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    y * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    BLOCK_SIZE, 
                    BLOCK_SIZE
                );
            }
        }
        // 중간 세로 선
        const startHightX = 10 * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE; // 오른쪽 상단 모서리의 x 좌표
        const startHightY = 0 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE; // 오른쪽 상단 모서리의 y 좌표
        const endHightY = 19 * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE + BORDER_SIZE; // 오른쪽 하단 모서리의 y 좌표
        context.strokeStyle = LINE_COLOR; // 보더 색상 설정
        context.lineWidth = LINE_WIDTH; // 보더 굵기 설정
        context.beginPath(); // 새로운 경로 시작
        context.moveTo(startHightX, startHightY); // 시작점 설정
        context.lineTo(startHightX, endHightY); // 오른쪽 하단 모서리까지 선 그리기
        context.stroke(); // 선 그리기
        // 중간 가로 선
        const startWidthX = 0 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE; // 시작점의 x 좌표
        const startWidthY = 9 * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE + BORDER_SIZE; // 시작점의 y 좌표
        const endWidthX = 21 * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE + BORDER_SIZE; // 끝점의 x 좌표

        context.strokeStyle = LINE_COLOR; // 보더 색상 설정
        context.lineWidth = LINE_WIDTH; // 보더 굵기 설정

        context.beginPath(); // 새로운 경로 시작
        context.moveTo(startWidthX, startWidthY); // 시작점 설정
        context.lineTo(endWidthX, startWidthY); // 가로선의 끝점 설정 (시작점의 y 좌표와 동일)
        context.stroke(); // 선 그리기
        // 점령 선(0,0)~(9,9)
        const drawBorders = () => {
            context.strokeStyle = LINE_COLOR; // 보더 색상 설정
            context.lineWidth = LINE_WIDTH; // 보더 굵기 설정
            
            for (let i = 0; i < 10; i++) {
                const x = i * (BLOCK_SIZE + BORDER_SIZE); // x 좌표 계산
                const y = i * (BLOCK_SIZE + BORDER_SIZE); // y 좌표 계산
                
                context.beginPath(); // 새로운 경로 시작
                
                // 위쪽 보더 그리기
                context.moveTo(x, y - BORDER_SIZE); 
                context.lineTo(x + BLOCK_SIZE, y - BORDER_SIZE);
                
                // 오른쪽 보더 그리기
                context.moveTo(x + BLOCK_SIZE + BORDER_SIZE, y); 
                context.lineTo(x + BLOCK_SIZE + BORDER_SIZE, y + BLOCK_SIZE);
                
                context.stroke(); // 보더 그리기
            }
        };
        // 점령 선 (12,9)~(21,0)
        const drawBorder2 = () => {
            context.strokeStyle = LINE_COLOR;
            context.lineWidth = LINE_WIDTH;
        
            for (let i = 12; i <= 21; i++) {
                const x = i * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
                const y = (21 - i) * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
        
                // 왼쪽 보더 그리기
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + BLOCK_SIZE + BORDER_SIZE, y);
                context.stroke();

                // 위쪽 보더 그리기
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x, y + BLOCK_SIZE + BORDER_SIZE);
                context.stroke();
                }
            };
            // 점령 선(10,10)~(1,19)
            const drawBorders3 = () => {
                context.strokeStyle = LINE_COLOR;
                context.lineWidth = LINE_WIDTH;
            
                for (let i = 10; i >= 1; i--) {
                    const x = i * (BLOCK_SIZE + BORDER_SIZE);
                    const y = (21 - i) * (BLOCK_SIZE + BORDER_SIZE);
                    
                    context.beginPath();
                    
                    // 왼쪽 보더 그리기
                    context.moveTo(x - BORDER_SIZE, y); 
                    context.lineTo(x - BORDER_SIZE, y - BLOCK_SIZE);
                    
                    // 위쪽 보더 그리기
                    context.moveTo(x, y - BLOCK_SIZE - BORDER_SIZE); 
                    context.lineTo(x + BLOCK_SIZE, y - BLOCK_SIZE - BORDER_SIZE);
                    
                    context.stroke();
                }
            };
            // 점령 선(12,10)~(21,19)
            const drawBorders4 = () => {
                context.strokeStyle = LINE_COLOR; // 보더 색상 설정
                context.lineWidth = LINE_WIDTH; // 보더 굵기 설정
            
                for (let i = 12; i <= 21; i++) {
                    const x = i * (BLOCK_SIZE + BORDER_SIZE); // x 좌표 계산
                    const y = (i - 2) * (BLOCK_SIZE + BORDER_SIZE); // y 좌표 계산
                    
                    context.beginPath(); // 새로운 경로 시작
                    
                    // 왼쪽 보더 그리기
                    context.moveTo(x - BORDER_SIZE, y + BLOCK_SIZE); 
                    context.lineTo(x - BORDER_SIZE, y);
                    
                    // 아래쪽 보더 그리기
                    context.moveTo(x - BORDER_SIZE, y + BLOCK_SIZE); 
                    context.lineTo(x + BLOCK_SIZE, y + BLOCK_SIZE);
                    
                    context.stroke(); // 보더 그리기
                }
            };
            // 함수 호출
            drawBorders();
            drawBorder2();
            drawBorders3();
            drawBorders4();
    }, []);

    // 유니온블록
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        // 유니온 블록
        unionBlock?.forEach((item) => {
            item?.block_position.forEach((block) => {
                context.fillStyle = "#bb9966";
                const x = START_POINT_X + block.x * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
                const y = canvas.height - (START_POINT_Y + block.y * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE + BORDER_SIZE);
                context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
            })
        });
        // 텍스트 호출
        const addText = (text, x, y) => {
            context.fillStyle = "#ffffff"; // 텍스트 색상 설정
            context.font = "12px 'Noto Sans KR', sans-serif"; // 텍스트 폰트 설정
            context.fillText(text, x, y); // 텍스트 그리기
        };
        // 함수 호출
        addText("상태이상내성", 5 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 2 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("크리티컬", 1* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("데미지", 1* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 7 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("방어율무시", 1* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 13 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("버프지속시간", 6* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 18 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("일반데미지", 12* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 18 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("보스데미지", 18* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 13 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("크리티컬", 18* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("확률", 18* (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 7 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        addText("획득경험치", 13 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 2 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE);
        innerStat?.forEach((item) => (
            item.stat_field_id == 0 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 8 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 1 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 12 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 2 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 14 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 9 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 3 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 14 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 12 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 4 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 12 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 14 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 5 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 8 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 14 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 6 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 12 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE),
            item.stat_field_id == 7 && addText(`${item.stat_field_effect.replace('유니온 ', '')}`, 6 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 9 * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE)
        ))
    }, [unionBlock]);
    return (
    <div className="flex flex-col items-center justify-center">
        <div className="bg-[#1f354d] h-11 w-[331px] rounded-t-lg text-white-color p-2 flex justify-between items-center">
            <p>{union?.union_grade}</p>
            <p>Lv.{union?.union_level}</p>
        </div>
        <canvas ref={canvasRef} className="bg-gray-400"></canvas>
        <section className="w-[331px] relative flex flex-col justify-center items-center bg-[#1f354d] p-3 rounded-b-lg space-y-2">
            <p className="text-[#ffe1be] text-start w-full">공격대 효과</p>
            <div className="w-full flex justify-center items-center space-x-1">
                <UnionSlot stat={unionStat}/>
                <UnionSlot occupied={unionOccupied}/>
            </div>
        </section>
    </div>
    )
}