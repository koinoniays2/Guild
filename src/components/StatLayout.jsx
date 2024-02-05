import React from 'react'
import { formatStatValue } from '../lib/functions'

export default function StatLayout({ children, coolTime }) {
    return (
        <div className="w-full flex justify-between items-center px-2">
            <span>
                {children && (
                {
                    "최대 스탯공격력": "스공",
                    "보스 몬스터 데미지": "보스 데미지",
                    "일반 몬스터 데미지": "일반 데미지",
                    "크리티컬 데미지": "크리 데미지",
                    "재사용 대기시간 감소 (초)" : "쿨타임 감소",
                    "재사용 대기시간 미적용" : "쿨타임 초기화",
                    "상태이상 추가 데미지" : "상추뎀"
                }[children.stat_name] || children.stat_name
                )}
            </span>
            <span className="font-bold">
                {children && (
                    children.stat_name === "재사용 대기시간 감소 (초)" ? formatStatValue(children) + " / " + coolTime + "%" :
                    children.stat_name === "공격 속도" ? children.stat_value + "단계" :
                [
                    "최대 스탯공격력",
                    "공격력",
                    "마력",
                    "HP",
                    "MP",
                    "STR",
                    "DEX",
                    "INT",
                    "LUK",
                    "스타포스",
                    "아케인포스",
                    "어센틱포스",
                    "방어력",
                    "상태이상 내성"
                ].includes(children.stat_name)
                    ? formatStatValue(children)
                    : formatStatValue(children) + "%"
                )}
            </span>
        </div>
    )
}
