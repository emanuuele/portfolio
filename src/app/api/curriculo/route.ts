import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import Chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "src", "curriculo.html");
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

  try {
    const html = await fs.readFile(htmlPath, "utf8");
    const imagePath = path.join(process.cwd(), "public", "manuela.png");
    const imageBuffer = await fs.readFile(imagePath);
    const imageDataUri = `data:image/png;base64,${imageBuffer.toString("base64")}`;
    const htmlWithAssets = html.replaceAll("../public/manuela.png", imageDataUri);

    browser = await puppeteer.launch({
      headless: true,
      args: Chromium.args,
      executablePath: await Chromium.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(htmlWithAssets);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await page.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="curriculo-emanuele-maria.pdf"',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await browser?.close();
  }
}