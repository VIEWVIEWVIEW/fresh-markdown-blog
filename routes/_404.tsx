import { UnknownPageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Navbar } from "../components/Navbar.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return <div class="container mx-auto ">
    <Navbar />

    <div class="mt-10 mx-auto flex flex-col items-center">
      <h1 class="font-serif text-4xl">404 - Not Found</h1>
      <hr class=" w-32 mt-14" />
    </div>
    <Footer />
  </div>
}