import { useEffect, useRef } from "react"
import { apiCharacterUnionRaider } from "../js/api";
import { useQuery } from "react-query";

export default function Union({ocid}) {
    const { data:dataGuildMemberUnionRaider, isLoading:isLoadingGuildMemberUnionRaider } = 
    useQuery(["getGuildMemberUnionRaider", ocid && { ocid : ocid }], apiCharacterUnionRaider, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    let unionBlock;
    if(!isLoadingGuildMemberUnionRaider) {
        unionBlock = dataGuildMemberUnionRaider.union_block;
    }
    // console.log(unionBlock);

    const canvasRef = useRef(null);
    const COLS = 22;
    const ROWS = 20;
    const BLOCK_SIZE = 14;
    const BORDER_SIZE = 1;
    const START_POINT_X = 11 * (BLOCK_SIZE + BORDER_SIZE);
    const START_POINT_Y = 9 * (BLOCK_SIZE + BORDER_SIZE);
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

        for(let x = 5; x < 5 + 12; x++) {
            for(let y = 5; y < 5 + 10; y++) {
                // 투명한 색상 설정
                context.fillStyle = "rgba(255, 255, 255, 0.2)";
                // 보더 색상 설정
                // context.strokeStyle = "#ff0000";
    
                // 상자 그리기
                context.fillRect( //strokeRect
                    x * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    y * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE, 
                    BLOCK_SIZE, 
                    BLOCK_SIZE
                );
            }
        }
    }, []);
    // 유니온블록
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        unionBlock?.forEach((item) => {
            item?.block_position.forEach((block) => {
                context.fillStyle = "#aa8866"
                const x = START_POINT_X + block.x * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
                const y = canvas.height - (START_POINT_Y + block.y * (BLOCK_SIZE + BORDER_SIZE) + BLOCK_SIZE + BORDER_SIZE);
                context.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
            })
        })
    }, [unionBlock]);
  return (
    <div className="flex justify-center">
        <canvas ref={canvasRef} className="bg-gray-400"></canvas>
    </div>
  )
}