import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
    runtime: 'experimental-edge'
};

const ogImageUrl = "https://lh3.googleusercontent.com/pw/AIL4fc_FNvjakux5qNZRIw1YjXsQASQ-ZtWDRdUoPk7sOVukhQ7q_a69GLiChA9EL8Ab5uML0u2Uzbl11hgNJwJ55nNHnEXHyEgjNH8CuibgybiYdfGovj3yYSlJmBpuwVZnTPonH5JxTB-sas5EJYy8YSZsQBiLdrIxUkWkQOJPI8Upadmxm4c5S5pYeVOt3_luPrQmSLv-3_jeeM3HZGj88CObk3h3vmznXLk_I3AJ88HsgroxbRiUwqDkGn3i7YpnmNHX1uRiBCaorDz5kLJoodSYwkRGUzmj9UyJUmL3QWfg_hS47Jjd3XMAYrewbx0jG8XG_lYR_nQzPGaltul3p1GA4KGRhqk25rxsVGifcuAaDer-nnsI7BPIz5CJuocH6qobJlW9pZqpvx1M-VykP8wxfh6COF96uewUqVuh0ZjkFfYhAKBgv6dsz2-kJ_SBZpiSW2kP38umEBUseQrVhLNoaGV-bi60lFELPCbqsBAHvn1q2_SgH66hZb1BSJsauURUTYaZLv_IDVPWQXkgZg5wJ4adP_xEo1B4w8cBlmi990D24pcVwSsDElGzFSRIfCZg60fB6VfPFDQk0SkVbIHD7d-t58DDO_ncU9mBYqcGSzcDNEPZV5S5l_hJ7dSZqqXDwo_0EYRXAoO0Vt3Z-yZOJ9v5rBw5KnRl_BHCKnYMsgx2D3fPqVETBQkg4EOsWArcXlSne2T84BSMwkpcvYUS4_O1VtfWmsxopQWzneebb5NzEzgfVSWQ92A7lk9kNa4RRbTB3ZqG0E9Z0hcMYyONScvENmgnrZFeRZGdhNV1UYTgi7Gm_nDxJMsk1-sZ1QggitEiLy-a97uk-euc8Rgw6SnDGxegH_bhwENkb_Ozn77rWtPMOZWhLWLI_b3Qm4RL0M9J7FCEOv6P8JuU4j7UMgq5NlA0w_KBQPvnf3DCUHtViz-Q-dimH_-f_MEeWT1naIlftRJ0uzmUHq4T0PKGqL1hv0uTUPrzWUdewBHJ64DCP5CIo8e1fGz-J1C8vfjaSpvRCvHafDikxXzdQHjh2vvsRtv3ESQ=w437-h220-no?authuser=0"

const boldFont = fetch(new URL("../../../public/fonts/Rajdhani-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());
const regularFont = fetch(new URL("../../../public/fonts/Rajdhani-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());
const lightFont = fetch(new URL("../../../public/fonts/Rajdhani-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());


const handler = async ( req: NextRequest ) => {

    const { searchParams } = req.nextUrl;

    const boldFontData = await boldFont;
    const regularFontData = await regularFont;

    const title = searchParams.get('title')
    const description = searchParams.get("description");
    const image = decodeURIComponent(searchParams.get("image")); // Decode the image URL




return new ImageResponse(
    (
    <div tw="flex flex-row-reverse h-full bg-neutral-800">
    <div tw=" flex w-1/2 h-full">    
        
    <div
            tw="w-full h-full"
            style={{
                backgroundImage: `url(${ogImageUrl})`,
                backgroundPosition: 'center',
                backgroundSize:'100% 100%'
            }}
        />
        <div tw="absolute left-[-80px] top-[-40px] w-[150px]  h-[120%] bg-neutral-800 " style={{transform: "rotate(12deg"}} />
    
    </div>
    <div tw="flex flex-col w-1/2 mt-auto p-6 text-white">
        <h1 tw="text-[80px]">Pearl Box</h1>
        {title && <h1 tw="text-[80px]">{title}</h1>}
        <p>
            {description ? description : "Discover the greatest collection of articles for curating a lifestyle worth living. Explore valuable insights on personal growth, health, finance, and more, empowering you to embrace a life of fulfillment and success."}
        </p>
    </div>
    </div>
    ),
    {
        fonts: [
            {
                name: "RajhaniBold",
                data: boldFontData,
                weight: 800,
            },
            {
                name: "RajhaniRegular",
                data: regularFontData,
                weight: 300,
            },
        ],
    }
)
}


export default handler;