import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import en from "../../locales/en.json";
import pt from "../../locales/pt.json";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";


export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [wasAttempted, setWasAttempted] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const { lang } = useLanguage();
    const t = lang === "en" ? en : pt;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setWasAttempted(true); 

        const isFormInvalid = !formData.name || !formData.email || !formData.subject || !formData.message;

        if (isFormInvalid) {     
            setStatus("error"); 
            return; 
        }
        setStatus("loading");

        try {
            const response = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/messages`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ data: formData }),
            });

            if (!response.ok) throw new Error();

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setWasAttempted(false);
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-20 px-6 bg-gray-50 rounded-lg">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">        
        
                <div className="md:w-1/3">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contatc.contact}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {t.contatc.content}
                    </p>
                    <div className="flex flex-row gap-6">
                        <a 
                            href="https://linkedin.com/in/carolina-medici" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-gray-700 hover:text-[#0077b5] transition-colors group"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#0077b5]/10 transition-colors">
                                <FaLinkedin size={22} />
                            </div>                 
                        </a>
                        
                        <a 
                            href="https://github.com/carolmedici" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-gray-700 hover:text-black transition-colors group"
                        >
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                                <FaGithub size={22} />
                            </div>    
                        </a>
                        
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mt-6 italic">
                        📍{t.contatc.available}
                        </p>
                    </div>
                </div>
            
                <div className="md:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder=" "
                                    className={`peer block w-full px-3 pt-6 pb-2 text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors ${wasAttempted && !formData.name ? "border-red-500" : "border-gray-200 focus:border-cyan-600"}`}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <label
                                htmlFor="name"
                                className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                                    wasAttempted && !formData.name ? "text-red-500" : "text-gray-500 peer-focus:text-cyan-600"
                                }`}>
                                    {t.contatc.name}
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder=""
                                    required
                                    className={`peer block w-full px-3 pt-6 pb-2 text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors ${wasAttempted && !formData.email ? "border-red-500" : "border-gray-200 focus:border-cyan-600"}`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                <label
                                htmlFor="email"
                                className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                                    wasAttempted && !formData.email ? "text-red-500" : "text-gray-500 peer-focus:text-cyan-600"
                                }`}>
                                    {t.contatc.email}
                                </label>
                            </div>   
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder=""
                                required
                                className={`peer block w-full px-3 pt-6 pb-2 text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors ${wasAttempted && !formData.subject ? "border-red-500" : "border-gray-200 focus:border-cyan-600"}`}
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                            <label
                            htmlFor="subject"
                            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                                    wasAttempted && !formData.subject ? "text-red-500" : "text-gray-500 peer-focus:text-cyan-600"
                                }`}>
                                {t.contatc.subject}
                            </label>
                        </div>
                        <div className="relative">
                            <textarea
                            placeholder=" "
                            required
                            rows={5}
                            className={`peer block w-full px-3 pt-6 pb-2 text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors ${wasAttempted && !formData.message ? "border-red-500" : "border-gray-200 focus:border-cyan-600"}`}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />   
                            <label
                            htmlFor="message"
                            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                                    wasAttempted && !formData.message ? "text-red-500" : "text-gray-500 peer-focus:text-cyan-600"
                                }`}>
                                {t.contatc.message}
                            </label>
                        </div>        
                        
                        <button
                        type="submit"
                        disabled={status === "loading"}
                        className={`w-full py-3 rounded-lg font-bold text-white transition ${status === "loading" ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 shadow-md"}`} >
                            {status === "loading" ? `${t.buttons.sending}` : `${t.buttons.sendMessage}`}
                        </button>
                            {status === "success" && (
                                <p className="text-green-600 text-center font-medium mt-2 animate-bounce">
                                    {t.contatc.success} ✨
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-red-600 text-center font-medium mt-2">
                                   {t.contatc.error}
                                </p>
                            )}
                    </form>
                </div>
            </div>
        </section>
    );
}