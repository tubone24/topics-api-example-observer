import texonomy from "@/lib/taxonomy";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    console.log("POST");
    const requestBody = await request.json();
    console.log(requestBody);
    if (Array.isArray(requestBody) && requestBody.length > 0) {
        // prisma topicsにデータを保存する
        const data = {
            data: requestBody.map((topic) => {
                return {
                    name: texonomy[Number(topic.topic)] || "missing",
                    configVersion: topic.configVersion,
                    modelVersion: topic.modelVersion,
                    taxonomyVersion: topic.taxonomyVersion,
                    topic: topic.topic,
                    version: topic.version,
                    createdAt: new Date(),
                };
            }),
        }
        const result = await prisma.topics.createMany(data);
        console.log(result);
        return Response.json(data);
    }
    return Response.json({ message: "Bad Request" });
}

export async function GET(request: Request) {
    console.log(request);
    const data = {
        data: [
            {
                name: texonomy[1] || "missing",
                configVersion: "test",
                modelVersion: "test",
                taxonomyVersion: "test",
                topic: "1",
                version: "test",
                createdAt: new Date(),
            }
        ]
        }
    const result = await prisma.topics.createMany(data);
    console.log(result);
    return Response.json(data);
}