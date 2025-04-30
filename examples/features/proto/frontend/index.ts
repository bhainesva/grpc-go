import { ConnectError, createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

// Import service definition that you want to connect to.
import { Echo } from "./echo_pb";

// `createGrpcWebTransport` instead.
const transport = createConnectTransport({
    baseUrl: "http://localhost:50051",
    httpVersion: "1.1"
  });

  // definition with the transport.
const client = createClient(Echo, transport);

async function makeRequestAndLogTrailers(msg: string) {
    console.log("Request: ", msg)
    try {
        await client.unaryEcho({message: msg}, {
            onTrailer(trailers) {
                console.log(trailers)
            },
        })
    } catch (error) {
        console.log((error as ConnectError).metadata)
    }
}


async function run() {
    for (const msg of ["ok", "err"]) {
        await makeRequestAndLogTrailers(msg)
    }
}

run();
