import { useEffect, useRef } from "react"
import { apiCharacterUnionRaider } from "../js/api";
import { useQuery } from "react-query";

export default function Union({ocid}) {
    const { data:dataGuildMemberUnionRaider, isLoading:isLoadingGuildMemberUnionRaider } = 
    useQuery(["getGuildMemberUnionRaider", ocid && { ocid : ocid }], apiCharacterUnionRaider, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    console.log(dataGuildMemberUnionRaider);    

    const canvasRef = useRef(null);
    const COLS = 20;
    const ROWS = 22;
    const BLOCK_SIZE = 15;
    const BORDER_SIZE = 1;
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width =  COLS * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
        canvas.height = ROWS * (BLOCK_SIZE + BORDER_SIZE) + BORDER_SIZE;
        
        const context = canvas.getContext("2d");
        // context.fillRect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
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
    },[])
  return (
    <div className="flex justify-center bg-gray-400">
        <canvas ref={canvasRef}></canvas>
    </div>
  )
}