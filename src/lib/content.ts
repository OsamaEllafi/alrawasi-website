export type Lang = 'ar' | 'en';
export const isLang = (value: string): value is Lang => value === 'ar' || value === 'en';
export const text = (lang: Lang, ar: string, en: string) => lang === 'ar' ? ar : en;
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
export const nav = [
  { path: '', ar: 'الرئيسية', en: 'Home' },
  { path: 'about', ar: 'من نحن', en: 'About' },
  { path: 'services', ar: 'خدماتنا', en: 'Services' },
  { path: 'projects', ar: 'المشاريع', en: 'Projects' },
];
export const projects = [
  { slug: 'central-bank-shahat', image: 'cbl-shahat.jpg', category: 'banking', title: { ar: 'مصرف ليبيا المركزي', en: 'Central Bank of Libya' }, location: { ar: 'شحات، ليبيا', en: 'Shahat, Libya' }, scope: { ar: 'التصميم الهندسي', en: 'Engineering design' }, description: { ar: 'تصميم مبنى فرع المصرف المركزي في شحات، مع الاهتمام بالمتطلبات الإنشائية والأمنية، والتوازن بين الوظيفة والهوية المعمارية.', en: 'The Central Bank branch in Shahat brings structural and security requirements together with a distinctive architectural identity.' } },
  { slug: 'bilal-mosque', image: 'bilal-mosque.jpg', category: 'cultural', title: { ar: 'مسجد بلال بن رباح', en: 'Bilal Bin Rabah Mosque' }, location: { ar: 'البيضاء، ليبيا', en: 'Al-Bayda, Libya' }, scope: { ar: 'الصيانة والتحوير', en: 'Maintenance & modification' }, description: { ar: 'مشروع صيانة وتحوير يجمع بين الطابع الإسلامي والتصميم الحديث، ويعتني بتفاصيل المكان ودوره في حياة المجتمع.', en: 'A maintenance and modification project bringing Islamic architectural character and contemporary design together in a space for the community.' } },
  { slug: 'souq-al-jumaa', image: 'shahat-mall.jpg', category: 'commercial', title: { ar: 'سوق الجمعة', en: 'Souq Al-Jumaa' }, location: { ar: 'شحات، ليبيا', en: 'Shahat, Libya' }, scope: { ar: 'التصميم والتطوير', en: 'Design & development' }, description: { ar: 'تصميم وتطوير مجمع تجاري متكامل في شحات، يربط مساحات التسوق والحركة والخدمات ضمن تجربة معمارية مترابطة.', en: 'An integrated commercial development in Shahat, connecting retail, circulation, and services in a coherent architectural experience.' } },
  { slug: 'libyana-sales-center', image: 'libyana-center.jpg', category: 'commercial', title: { ar: 'مركز مبيعات ليبيانا', en: 'Libyana Sales Center' }, location: { ar: 'ليبيا', en: 'Libya' }, scope: { ar: 'التصميم الداخلي والخارجي', en: 'Interior & exterior design' }, description: { ar: 'تصميم داخلي وخارجي يعكس هوية ليبيانا، وينظم المساحات بما يخدم تجربة العملاء ومتطلبات العمل اليومية.', en: 'Interior and exterior design reflecting Libyana’s identity, with spaces arranged around the customer experience and everyday operations.' } },
  { slug: 'national-commercial-bank', image: 'ncb-faidiya.jpg', category: 'banking', title: { ar: 'المصرف التجاري الوطني', en: 'National Commercial Bank' }, location: { ar: 'الفائدية، ليبيا', en: 'Al-Faidiya, Libya' }, scope: { ar: 'مبنى مصرفي جديد', en: 'New banking building' }, description: { ar: 'مشروع مبنى جديد لفرع المصرف التجاري الوطني في الفائدية، يجمع متطلبات الخدمة المصرفية والتصميم المعماري.', en: 'A new building for the National Commercial Bank’s Al-Faidiya branch, addressing banking operations through architectural design.' } },
  { slug: 'othman-mosque', image: 'othman-mosque.jpg', extra: 'othman-mosque-1.jpg', category: 'cultural', title: { ar: 'مسجد عثمان بن عفان', en: 'Othman Bin Affan Mosque' }, location: { ar: 'البيضاء، ليبيا', en: 'Al-Bayda, Libya' }, scope: { ar: 'الصيانة والتحوير', en: 'Maintenance & modification' }, description: { ar: 'صيانة وتحوير شامل للمسجد، مع الحفاظ على طابعه الإسلامي والعناية بعلاقته بالمحيط العمراني.', en: 'Comprehensive maintenance and modification of the mosque, preserving its Islamic character and relationship with the surrounding city.' } },
  { slug: 'financial-stability-unit', image: 'central-bank.jpg', category: 'banking', title: { ar: 'قسم الإصدار ووحدة الاستقرار المالي', en: 'Issue Department & Financial Stability Unit' }, location: { ar: 'ليبيا', en: 'Libya' }, scope: { ar: 'تصميم مبنى إداري', en: 'Administrative building design' }, description: { ar: 'تصميم مبنى إداري يراعي الأمان والأنظمة الذكية واحتياجات العمل، من التكوين المعماري إلى التفاصيل الوظيفية.', en: 'An administrative building designed around security, smart systems, and operational needs, from its architectural form to its functional details.' } },
];
export type Project = typeof projects[number];
export const categories = [
  { id: 'all', ar: 'جميع المشاريع', en: 'All projects' },
  { id: 'banking', ar: 'المصارف والإدارة', en: 'Banking & administration' },
  { id: 'cultural', ar: 'العمارة الإسلامية', en: 'Islamic architecture' },
  { id: 'commercial', ar: 'المشاريع التجارية', en: 'Commercial' },
];
export const services = [
  { ar: 'الدراسات والتخطيط', en: 'Studies & planning', descAr: 'كل مشروع متين يبدأ بفهم دقيق. ندرس الموقع واحتياجات المشروع والاعتبارات البيئية لنضع أساساً واضحاً للقرارات الهندسية.', descEn: 'Sound projects begin with understanding. We study the site, project requirements, and environmental considerations to establish a clear basis for engineering decisions.', itemsAr: ['دراسة الموقع واحتياجات المشروع', 'دراسات الجدوى', 'الدراسات البيئية'], itemsEn: ['Site and requirements analysis', 'Feasibility studies', 'Environmental studies'] },
  { ar: 'التصاميم الهندسية', en: 'Engineering design', descAr: 'نربط الرؤية المعمارية بالحلول الإنشائية والكهروميكانيكية، لتعمل تفاصيل المشروع معاً بوضوح وانسجام.', descEn: 'We connect architectural intent with structural and electromechanical solutions so the project’s individual details work together.', itemsAr: ['التصميم المعماري والإنشائي', 'الأنظمة الكهروميكانيكية', 'أنظمة الاتصالات'], itemsEn: ['Architectural and structural design', 'Electromechanical systems', 'Telecommunications systems'] },
  { ar: 'إدارة المشاريع', en: 'Project management', descAr: 'نواكب المشروع أثناء التنفيذ، عبر الإشراف الفني ومراقبة الجودة ومتابعة الوقت والتكلفة.', descEn: 'We support projects through execution with technical supervision, quality control, and attention to schedules and costs.', itemsAr: ['الإشراف الفني', 'مراقبة الجودة', 'إدارة الجداول والتكاليف'], itemsEn: ['Technical supervision', 'Quality control', 'Schedule and cost management'] },
  { ar: 'السلامة المهنية', en: 'Occupational safety', descAr: 'مراجعة نظم السلامة في مواقع العمل، بما يراعي المتطلبات المحلية ويحافظ على سلامة الأفراد.', descEn: 'Reviewing site safety systems with regard to local requirements and the wellbeing of everyone on site.', itemsAr: ['مراجعة نظم السلامة', 'الامتثال للمتطلبات المحلية'], itemsEn: ['Site safety reviews', 'Local compliance requirements'] },
  { ar: 'الاستشارات الفنية', en: 'Technical consulting', descAr: 'حل التحديات الهندسية أثناء التنفيذ، وتقديم المشورة المتخصصة بشأن المواد والمعدات.', descEn: 'Addressing engineering challenges during execution and advising on appropriate materials and equipment.', itemsAr: ['حل مشاكل التنفيذ', 'المشورة للمواد والمعدات'], itemsEn: ['Execution problem-solving', 'Materials and equipment advice'] },
  { ar: 'التنمية العقارية', en: 'Real estate development', descAr: 'تطوير المشاريع العقارية والمساهمة في إعادة تأهيل المدن المتضررة، مع رؤية تربط المبنى بمحيطه.', descEn: 'Developing real estate projects and contributing to the rehabilitation of affected cities, connecting each building to its context.', itemsAr: ['تطوير المشاريع العقارية', 'إعادة تأهيل المدن'], itemsEn: ['Real estate projects', 'Urban rehabilitation'] },
  { ar: 'التخطيط الحضري', en: 'Urban planning', descAr: 'تخطيط الفضاءات الحضرية برؤية تراعي احتياجات المجتمع واستدامة المكان على المدى البعيد.', descEn: 'Planning urban spaces with consideration for community needs and the long-term sustainability of place.', itemsAr: ['تطوير الفضاءات الحضرية', 'التخطيط المستدام للمجتمعات'], itemsEn: ['Urban space development', 'Sustainable community planning'] },
  { ar: 'الإشراف على الاختبارات', en: 'Testing supervision', descAr: 'متابعة الاختبارات المعملية والميدانية ومراقبتها، لدعم التحقق من جودة أعمال المشروع.', descEn: 'Supervising laboratory and field testing to support quality verification throughout the project.', itemsAr: ['الاختبارات المعملية', 'الاختبارات الميدانية'], itemsEn: ['Laboratory testing oversight', 'Field testing oversight'] },
  { ar: 'التدريب والتطوير', en: 'Training & development', descAr: 'تطوير مهارات الكوادر البشرية ونقل المعرفة في المجالات الهندسية المختلفة.', descEn: 'Developing people’s skills and sharing knowledge across engineering disciplines.', itemsAr: ['تطوير الكفاءات الهندسية', 'نقل المعرفة والخبرات'], itemsEn: ['Engineering skills development', 'Knowledge and experience sharing'] },
];
export const offices = [
  { ar: 'البيضاء', en: 'Al-Bayda', addressAr: 'مبنى وزارة الاقتصاد والصناعة سابقاً، مقابل مدرسة الإسراء والمعراج', addressEn: 'Former Ministry of Economy & Industry building, opposite Al-Israa wal Mi’raj School', search: 'Al Bayda Libya Ministry of Economy' },
  { ar: 'بنغازي', en: 'Benghazi', addressAr: 'مجمع نادي قاريونس التجاري', addressEn: 'Garyounis Club Commercial Complex', search: 'Garyounis Club Benghazi Libya' },
  { ar: 'طرابلس', en: 'Tripoli', addressAr: 'بجوار مصرف الادخار والاستثمار العقاري', addressEn: 'Next to the Real Estate Savings & Investment Bank', search: 'Real Estate Savings Investment Bank Tripoli Libya' },
];
export const clients = [
  ['reconstruction-fund-new.png', 'صندوق تنمية وإعمار ليبيا', 'Libya Reconstruction Fund'],
  ['libyana.png', 'ليبيانا للهاتف المحمول', 'Libyana'],
  ['ncb.png', 'المصرف التجاري الوطني', 'National Commercial Bank'],
  ['wahda.png', 'مصرف الوحدة', 'Wahda Bank'],
  ['cbl-final.png', 'مصرف ليبيا المركزي', 'Central Bank of Libya'],
  ['al-bayda-municipal.png', 'المجلس البلدي البيضاء', 'Al-Bayda Municipal Council'],
  ['finance-ministry-transparent.png', 'وزارة المالية', 'Ministry of Finance'],
  ['awqaf.jpg', 'الهيئة العامة للأوقاف', 'General Authority for Awqaf'],
  ['bcd.png', 'مصرف التجارة والتنمية', 'Bank of Commerce & Development'],
  ['ministry-agra.png', 'وزارة الزراعة', 'Ministry of Agriculture'],
  ['akhdar-transparent.png', 'نادي الأخضر الرياضي', 'Al-Akhdar Sport Club'],
  ['libya-post.png', 'بريد ليبيا', 'Libya Post'],
  ['senussi-university.png', 'جامعة السنوسي الإسلامية', 'Al-Senussi Islamic University'],
  ['ministry-health.png', 'وزارة الصحة', 'Ministry of Health'],
  ['ministry-justice.png', 'وزارة العدل', 'Ministry of Justice'],
  ['nab-bank.png', 'مصرف شمال أفريقيا', 'North Africa Bank'],
  ['emaar-libya.png', 'شركة إعمار ليبيا القابضة', 'Emaar Libya Holding'],
  ['man-made-river.png', 'جهاز استثمار مياه النهر الصناعي', 'Man-Made River Water Investment Authority'],
];
