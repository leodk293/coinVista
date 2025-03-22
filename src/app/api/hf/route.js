import { NextResponse } from "next/server";
import { inference } from "@/utils/hf";
import { parse } from "url";

export async function POST(request) {
  const { query } = parse(request.url, true);
  const type = query.type;

  const formData = await request.formData();

  try {

    if (type == "ttimg") {
      const prompt = formData.get("prompt");
    
      const out = await inference.textToImage({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry",
        },
      });

      console.log(out);

      const buffer = Buffer.from(await out.arrayBuffer());

      /*const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        "generated-image.jpg"
      );*/

      //await fs.writeFile(imagePath, buffer);

      const baseUrl = "http://localhost:3001";
      const imageUrl = `${baseUrl}/images/generated-image.jpg`;

      return NextResponse.json({ message: imageUrl }, { status: 200 });


    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}