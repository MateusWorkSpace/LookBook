import React from 'react';

interface LandingProps {
  navigate: (view: string) => void;
}

const Landing: React.FC<LandingProps> = ({ navigate }) => {
    return (
        <div className="bg-white text-gray-900 antialiased font-tajawal" lang="ar" dir="rtl">
            <nav className="bg-white shadow-sm sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl h-16 flex justify-between items-center">
                    <a href="#" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-luxelink-900 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m.758 4.899l-1.828 1.828"></path></svg>
                        </div>
                        <span className="font-bold text-xl text-luxelink-900">LuxeLink</span>
                    </a>
                    
                    <div className="hidden md:flex items-center space-x-reverse space-x-6">
                        <a href="#features" className="text-gray-600 hover:text-luxelink-700">كيف يعمل</a>
                        <a href="#pricing" className="text-gray-600 hover:text-luxelink-700">الأسعار</a>
                        <button onClick={() => navigate('login')} className="text-gray-600 hover:text-luxelink-700">تسجيل الدخول</button>
                        <button onClick={() => navigate('register')} className="bg-luxelink-700 hover:bg-luxelink-800 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-300">
                            ابدأ مجاناً
                        </button>
                    </div>
                    
                    <div className="md:hidden">
                        <button className="text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </nav>

            <section className="bg-luxelink-950 text-white">
                <div className="container mx-auto max-w-7xl px-6 py-20 md:py-32 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        وداعاً لفوضى الواتساب.
                        <span className="block text-luxelink-300">صمم كتالوجات رقمية حصرية لعملاء VIP.</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-luxelink-200 max-w-3xl mx-auto">
                        LuxeLink هي الأداة الاحترافية لمسوقي الموضة الشخصيين والبوتيكات الفاخرة. توقف عن إرسال عشرات الصور المبعثرة. أنشئ كتالوجات خاصة وأنيقة في دقائق، واستقبل الطلبات مباشرة على واتساب.
                    </p>
                    <div className="mt-10">
                        <button onClick={() => navigate('register')} className="bg-luxelink-600 hover:bg-luxelink-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300">
                            أنشئ أول كتالوج (مجاناً)
                        </button>
                        <p className="mt-4 text-sm text-luxelink-400">بدون بطاقة ائتمان. إعداد في 60 ثانية.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gray-50" id="problem">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            استوديو الصور في هاتفك ليس صالة عرض.
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            إذا كانت هذه معاناتك اليومية، فأنت تخسر مبيعات ومظهرك الاحترافي.
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="text-center">
                            <div className="flex justify-center items-center mx-auto w-16 h-16 bg-luxelink-100 rounded-full">
                                <svg className="w-8 h-8 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-xl font-semibold">عشرات الصور المبعثرة</h3>
                            <p className="mt-2 text-gray-600">
                                عميلك الـ VIP يضطر لتصفح 50 صورة مبعثرة بين الدردشات، مما يشتت انتباهه ويفقده حماسه.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="flex justify-center items-center mx-auto w-16 h-16 bg-luxelink-100 rounded-full">
                                <svg className="w-8 h-8 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537c-.654.094-1.31.12-1.98.12H9.75c-.67 0-1.326-.026-1.98-.12L4.047 17.1c-1.133-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097L6.75 8.25m.75 3l.75-3m.75 3l.75-3m.75 3l.75-3m3 3l.75-3m.75 3l.75-3m.75 3l.75-3m.75 3l-6 3l.75-3m.75 3l.75-3" />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-xl font-semibold">رسائل مربكة</h3>
                            <p className="mt-2 text-gray-600">
                                "أعجبتني تلك القطعة... الثالثة التي أرسلتها أمس." تضيع وقتك الثمين في محاولة تخمين ما يريده العميل.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="flex justify-center items-center mx-auto w-16 h-16 bg-luxelink-100 rounded-full">
                                <svg className="w-8 h-8 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 1.562c.324-.818 1.558-.818 1.882 0l1.928 4.897a1.125 1.125 0 002.105.21V2.83c0-.818.995-1.255 1.6-.7l1.107.632a1.125 1.125 0 001.317 0l.283-.283c.505-.505.07-1.39-.7-1.6l-4.12-1.162a1.125 1.125 0 00-1.125 0L9.813 1.562zM3.4 18.375c.324.818 1.558.818 1.882 0l1.928-4.897a1.125 1.125 0 002.105-.21v3.83c0 .818.995 1.255 1.6.7l1.107-.632a1.125 1.125 0 001.317 0l.283.283c.505.505.07 1.39-.7 1.6l-4.12 1.162a1.125 1.125 0 00-1.125 0L3.4 18.375z" />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-xl font-semibold">صورة غير احترافية</h3>
                            <p className="mt-2 text-gray-600">
                                إرسال "ألبوم الكاميرا" لا يليق بفخامة الماركات التي تبيعها. يبدو الأمر غير منظم ويقلل من قيمة خدمتك.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-luxelink-900 text-white" id="solution">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold uppercase text-luxelink-400">الحل الأمثل</span>
                            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                                أناقة الكتالوج، وسرعة الواتساب.
                            </h2>
                            <p className="mt-6 text-lg text-luxelink-200">
                                LuxeLink يعيد تنظيم عملية البيع. بدلاً من الفوضى، أنت ترسل <strong>رابط واحد حصري</strong>.
                            </p>
                            <p className="mt-4 text-lg text-luxelink-200">
                                عميلك يفتح "مجلة رقمية" خاصة وتفاعلية. عندما يختار قطعة، ينقر على زر "لدي اهتمام"، ويفتح الواتساب الخاص به <strong>تلقائياً</strong>، مع رسالة جاهزة ومحددة بالقطعة المطلوبة.
                            </p>
                        </div>
                        
                        <div className="p-8 bg-luxelink-800 rounded-lg shadow-2xl">
                            <div className="bg-white rounded-lg p-4">
                                <img src="https://i.imgur.com/8Q1m3qU.png" alt="Mockup do Lookbook Digital no Celular" className="rounded-md shadow-lg" />
                            </div>
                            <p className="text-center mt-4 text-sm text-luxelink-300">هكذا يرى عميلك الـ VIP الكتالوج.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white" id="features">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            مصمم للبيع، وليس للعرض فقط.
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            ميزات تم تصميمها لتسريع مبيعاتك وإضفاء طابع احترافي.
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                            <svg className="w-10 h-10 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M3 3.75A.75.75 0 013.75 3h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V3.75zM9 4.5v15h11.25V4.5H9z" clipRule="evenodd" />
                            </svg>
                            <h3 className="mt-5 text-xl font-semibold">صمم كتالوجات في دقائق</h3>
                            <p className="mt-2 text-gray-600">
                                لوحة التحكم البسيطة (التي صممتها) تتيح لك رفع الصور، إضافة العناوين، الأسعار (أو إخفائها)، والملاحظات.
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                             <svg className="w-10 h-10 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.527 1.139.75.75 0 00-.47 1.082l.023.082a.75.75 0 001.082.47 8.25 8.25 0 013.26-1.026.75.75 0 00.136-1.071l-.082-.023zM15.75 12c0 .828-.672 1.5-1.5 1.5H9.75a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5z" clipRule="evenodd" />
                              <path d="M.75 9.75A2.25 2.25 0 013 7.5h12A2.25 2.25 0 0117.25 9.75v5.418A2.257 2.257 0 0116.5 15.5h-1.372a.75.75 0 01-.69-.46l-.35-1.05a.75.75 0 00-.69-.46H7.5a.75.75 0 00-.69.46l-.35 1.05a.75.75 0 01-.69.46H4.5A2.25 2.25 0 012.25 13.5V9.75A2.25 2.25 0 01.75 9.75zM3 9.75A.75.75 0 002.25 9v.75a.75.75 0 00.75.75h12a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H3z" />
                              <path d="M19.5 9.75A2.25 2.25 0 0121.75 12v5.418c0 .63-.3 1.2-.79 1.588l-1.372.914a.75.75 0 01-.69.06l-.35-.175a.75.75 0 00-.69.06l-.35.175a.75.75 0 01-.69-.06l-1.372-.914a2.25 2.25 0 01-.79-1.588V12A2.25 2.25 0 0115 9.75h4.5zM16.5 12a.75.75 0 00-.75-.75h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 00.75-.75z" />
                            </svg>
                            <h3 className="mt-5 text-xl font-semibold">البيع بنقرة واحدة</h3>
                            <p className="mt-2 text-gray-600">
                                كل زر "لدي اهتمام" هو رابط مباشر إلى الواتساب الخاص بك، مع رسالة جاهزة باسم المنتج. لا يوجد أي عوائق أمام الشراء.
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                            <svg className="w-10 h-10 text-luxelink-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                            </svg>
                            <h3 className="mt-5 text-xl font-semibold">تصميم فاخر وخاص</h3>
                            <p className="mt-2 text-gray-600">
                                كتالوجاتك ليست عامة. أنت تنشئ رابطاً خاصاً وترسله فقط لمن تريد. واجهة العرض نظيفة وأنيقة وتركز على منتجاتك.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-luxelink-950 text-white" id="social-proof">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            المعيار الجديد لمسوقي الموضة في الرياض وجدة
                        </h2>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-luxelink-900 p-8 rounded-lg shadow-lg">
                            <p className="text-lg text-luxelink-200 italic">
                                "عميلاتي الـ VIP أحبوا الفكرة. شعروا وكأنهم يحصلون على تنسيق حصري لهم، وليس مجرد صور مبعثرة. توقفت عن خسارة المبيعات بسبب الفوضى في الواتساب. LuxeLink هو سلاحي السري."
                            </p>
                            <p className="mt-6 font-semibold text-white">
                                – فاطمة أ.، مسوقة موضة شخصية (الرياض)
                            </p>
                        </div>
                        
                        <div className="bg-luxelink-900 p-8 rounded-lg shadow-lg">
                            <p className="text-lg text-luxelink-200 italic">
                                "أستخدم LuxeLink لإطلاق الكولكشن الجديد لأفضل 50 عميلة لدي قبل عرضها في المتجر. أنشئ الكتالوج، أرسل الرابط، وتصلني الطلبات منظمة بالكامل. فكرة عبقرية."
                            </p>
                            <p className="mt-6 font-semibold text-white">
                                – مدير بوتيك، (جدة)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white" id="pricing">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            ابدأ مجاناً. وتوسع وقتما تشاء.
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            خطط أسعار بسيطة وواضحة تناسب احتياجاتك.
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="border border-gray-200 rounded-lg p-8 shadow-sm">
                            <h3 className="text-2xl font-semibold">الخطة المجانية</h3>
                            <p className="mt-2 text-4xl font-extrabold text-right">0 <span className="text-xl font-medium text-gray-500">ر.س / مدى الحياة</span></p>
                            <p className="mt-4 text-gray-600">لمن بدأ للتو.</p>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span><span className="font-semibold">3</span> كتالوجات نشطة</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span><span className="font-semibold">10</span> قطع لكل كتالوج</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span>رابط واتساب مباشر</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span>علامة "صنع بواسطة LuxeLink"</span>
                                </li>
                            </ul>
                            <button onClick={() => navigate('register')} className="mt-8 block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                                ابدأ مجاناً
                            </button>
                        </div>
                        
                        <div className="relative border-4 border-luxelink-700 rounded-lg p-8 shadow-2xl">
                            <span className="absolute top-0 -translate-y-1/2 bg-luxelink-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">الأكثر رواجاً</span>
                            
                            <h3 className="text-2xl font-semibold">الخطة الاحترافية (Pro)</h3>
                            <p className="mt-2 text-4xl font-extrabold text-right">109 <span className="text-xl font-medium text-gray-500">ر.س / شهرياً</span></p>
                            <p className="mt-4 text-gray-600">للمحترفين والبوتيكات الجادة.</p>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span className="font-semibold">كتالوجات غير محدودة</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span className="font-semibold">قطع غير محدودة</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span>رابط واتساب مباشر</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span className="font-semibold">بدون علامة مائية</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span>إحصائيات (قريباً)</span>
                                </li>
                            </ul>
                            <button onClick={() => navigate('register')} className="mt-8 block w-full bg-luxelink-700 hover:bg-luxelink-800 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                                اختر الخطة الاحترافية
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="bg-luxelink-900">
                <div className="container mx-auto max-w-7xl px-6 py-20 md:py-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        توقف عن إرسال الصور. ابدأ بإرسال تجارب فاخرة.
                    </h2>
                    <p className="mt-4 text-lg text-luxelink-200 max-w-2xl mx-auto">
                        أنشئ حسابك المجاني في 60 ثانية. عملاؤك الـ VIP سيلاحظون الفرق فوراً.
                    </p>
                    <div className="mt-10">
                        <button onClick={() => navigate('register')} className="bg-luxelink-600 hover:bg-luxelink-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300">
                            أنشئ كتالوجك المجاني الآن
                        </button>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-100">
                <div className="container mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-luxelink-900 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m.758 4.899l-1.828 1.828"></path></svg>
                        </div>
                        <span className="font-bold text-xl text-luxelink-900">LuxeLink</span>
                    </div>
                    <div className="flex space-x-reverse space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-800">الشروط</a>
                        <a href="#" className="text-gray-500 hover:text-gray-800">الخصوصية</a>
                        <a href="#" className="text-gray-500 hover:text-gray-800">اتصل بنا</a>
                    </div>
                    <p className="text-gray-500 text-sm mt-4 md:mt-0">
                        &copy; 2025 LuxeLink. جميع الحقوق محفوظة.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
