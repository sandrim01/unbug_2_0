import "./globals.css";

export const metadata = {
    title: "Unbug ERP | Ultimate",
    description: "Premium Enterprise Resource Planning",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
