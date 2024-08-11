/** @type {import('next').NextConfig} */
/*Permite ao NEXT exibir as imagens vindas do servidor */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "utfs.io"
         }
      ]
   }
};

export default nextConfig;
