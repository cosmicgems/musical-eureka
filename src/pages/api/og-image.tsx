import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
    runtime: 'experimental-edge'
};

const ogImageUrl = "https://images.pexels.com/photos/16681131/pexels-photo-16681131/free-photo-of-machu-picchu-al-amanecer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

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
        <img 
        tw="w-full h-full"
        src={image}
        alt="og image" 
        />
        <div tw="absolute left-[-80px] top-[-40px] w-[150px]  h-[120%] bg-neutral-800 " style={{transform: "rotate(12deg"}} />
    
    </div>
    <div tw="flex flex-col w-1/2 mt-auto p-6 text-white">
        <h1 tw="text-[80px]">{title}</h1>
        <p>
            {description}
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