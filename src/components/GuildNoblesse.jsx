export default function GuildNoblesse({ guildNoblesse }) {
    return (
        <div className="flex flex-col item-start sm:items-center justify-end space-y-5 z-10 p-base pb-10 text-white-color">
            <p className="w-40 py-1 text-center bg-black rounded-lg">노블레스 길드스킬</p>
            <div className="flex space-x-5">
                {
                    guildNoblesse?.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img className="w-8 h-8" src={item.skill_icon} alt={item.skill_name} />
                            <p className="text-sm"><span className="font-bold">{item.skill_level}</span>/15</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
