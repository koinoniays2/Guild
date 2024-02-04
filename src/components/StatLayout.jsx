import React from 'react'
import { formatStatValue } from '../lib/functions'

export default function StatLayout({ children }) {
    return (
        <div className="w-full flex justify-between items-center px-2">
            <span>
                {children && (
                {
                    "최대 스탯공격력": "스공",
                    "보스 몬스터 데미지": "보스 데미지",
                    "일반 몬스터 데미지": "일반 데미지",
                    "크리티컬 데미지": "크리 데미지",
                }[children.stat_name] || children.stat_name
                )}
            </span>
            <span className="font-bold">
                {children && (
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
                ].includes(children.stat_name)
                    ? formatStatValue(children)
                    : formatStatValue(children) + "%"
                )}
            </span>
        </div>
    )
}
