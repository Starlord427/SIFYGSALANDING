(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[313],{78:function(e,a,r){Promise.resolve().then(r.bind(r,9263))},9263:function(e,a,r){"use strict";r.r(a),r.d(a,{default:function(){return p}});var i=r(7437),t=r(9738),s=r.n(t),n=r(2265),o=r(6691),c=r.n(o),d=r(609),l=r(3089),u=r(345),f=r(4033);let m=["Todos","Arquitectura","Construcci\xf3n","Renovaci\xf3n","Interior"],b=[{id:1,title:"Torre Corporativa Skyline",category:"Arquitectura",description:"Dise\xf1o y construcci\xf3n de una torre de oficinas de 30 pisos con certificaci\xf3n LEED. Este proyecto innovador incorpora tecnolog\xedas de ahorro energ\xe9tico y espacios de trabajo flexibles para satisfacer las demandas del mundo corporativo moderno.",image:"/projects/torre-corporativa.jpg",details:["30 pisos de oficinas de alta gama","Certificaci\xf3n LEED Gold","Sistema de gesti\xf3n energ\xe9tica inteligente","Terrazas verdes y espacios comunes","Estacionamiento subterr\xe1neo para 500 veh\xedculos"]},{id:2,title:"Complejo Residencial Riverside",category:"Construcci\xf3n",description:"Desarrollo de un complejo residencial de lujo con 200 unidades y \xe1reas verdes. Ubicado a orillas del r\xedo, este proyecto combina comodidad moderna con un dise\xf1o que aprovecha al m\xe1ximo las vistas panor\xe1micas y el entorno natural.",image:"/projects/complejo-residencial.jpg",details:["200 unidades residenciales de lujo","Piscina infinita con vista al r\xedo","Gimnasio y spa de \xfaltima generaci\xf3n","Parque privado de 2 hect\xe1reas","Sistema de seguridad 24/7"]},{id:3,title:"Renovaci\xf3n Centro Hist\xf3rico",category:"Renovaci\xf3n",description:"Restauraci\xf3n y modernizaci\xf3n de edificios hist\xf3ricos en el centro de la ciudad. Este proyecto desafiante implic\xf3 la preservaci\xf3n de fachadas hist\xf3ricas mientras se actualizaban completamente los interiores para usos modernos.",image:"/projects/renovacion-centro.jpg",details:["Restauraci\xf3n de 10 edificios hist\xf3ricos","Modernizaci\xf3n de sistemas el\xe9ctricos y de plomer\xeda","Creaci\xf3n de espacios comerciales en planta baja","Instalaci\xf3n de ascensores respetando la estructura original","Iluminaci\xf3n arquitect\xf3nica para resaltar detalles hist\xf3ricos"]},{id:4,title:"Edificio Sustentable GreenTech",category:"Arquitectura",description:"Dise\xf1o y construcci\xf3n de un edificio de oficinas con tecnolog\xedas de energ\xeda renovable. Este proyecto pionero demuestra c\xf3mo la arquitectura moderna puede integrarse perfectamente con soluciones sostenibles.",image:"/projects/edificio-sustentable.jpg",details:["Paneles solares que cubren el 80% del consumo energ\xe9tico","Sistema de recolecci\xf3n y reutilizaci\xf3n de agua de lluvia","Fachada con jardines verticales","Uso de materiales reciclados y de bajo impacto ambiental","Estaciones de carga para veh\xedculos el\xe9ctricos"]}];function p(){let[e,a]=(0,n.useState)("Todos"),r=(0,f.useSearchParams)(),t=null==r?void 0:r.get("selected");(0,n.useEffect)(()=>{if(t){let e=document.getElementById(t);e&&e.scrollIntoView({behavior:"smooth"})}},[t]);let o="Todos"===e?b:b.filter(a=>a.category===e);return(0,i.jsxs)("div",{className:"jsx-6ab6e10fd789b520 min-h-screen bg-black text-white",children:[(0,i.jsxs)("main",{className:"jsx-6ab6e10fd789b520 container mx-auto px-4 py-16",children:[(0,i.jsx)("h1",{className:"jsx-6ab6e10fd789b520 text-4xl font-bold mb-8 text-center",children:"Nuestros Proyectos"}),(0,i.jsx)("div",{className:"jsx-6ab6e10fd789b520 flex justify-center mb-12",children:(0,i.jsx)("div",{className:"jsx-6ab6e10fd789b520 flex gap-4 overflow-x-auto pb-4 hide-scrollbar",children:m.map(r=>(0,i.jsx)(l.z,{onClick:()=>a(r),variant:"ghost",className:(0,u.cn)("text-white",e===r?"bg-[#FF7420] hover:bg-[#FF7420]/90":"hover:bg-gray-800"),children:r},r))})}),(0,i.jsx)("div",{className:"jsx-6ab6e10fd789b520 grid grid-cols-1 md:grid-cols-2 gap-8",children:o.map((e,a)=>(0,i.jsxs)(d.Zb,{id:e.id.toString(),className:"bg-gray-900 border-gray-800",children:[(0,i.jsx)("div",{className:"jsx-6ab6e10fd789b520 relative aspect-video overflow-hidden rounded-t-lg",children:(0,i.jsx)(c(),{src:e.image,alt:e.title,fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",quality:75,placeholder:"blur",blurDataURL:"/placeholder.svg?height=400&width=600",className:"object-cover transition-transform duration-300 hover:scale-110"})}),(0,i.jsxs)(d.Ol,{children:[(0,i.jsx)(d.ll,{className:"text-2xl text-[#FF7420]",children:e.title}),(0,i.jsx)(d.SZ,{className:"text-gray-400",children:e.category})]}),(0,i.jsxs)(d.aY,{children:[(0,i.jsx)("p",{className:"jsx-6ab6e10fd789b520 text-gray-300 mb-4",children:e.description}),(0,i.jsx)("h4",{className:"jsx-6ab6e10fd789b520 font-semibold text-white mb-2",children:"Detalles del proyecto:"}),(0,i.jsx)("ul",{className:"jsx-6ab6e10fd789b520 list-disc list-inside text-gray-300",children:e.details.map((e,a)=>(0,i.jsx)("li",{className:"jsx-6ab6e10fd789b520",children:e},a))})]})]},a))})]}),(0,i.jsx)(s(),{id:"6ab6e10fd789b520",children:".hide-scrollbar.jsx-6ab6e10fd789b520::-webkit-scrollbar{display:none}.hide-scrollbar.jsx-6ab6e10fd789b520{-ms-overflow-style:none;scrollbar-width:none}"})]})}},3089:function(e,a,r){"use strict";r.d(a,{z:function(){return u}});var i=r(7437),t=r(2265),s=r(7256),n=r(6061),o=r(1396),c=r.n(o),d=r(345);let l=(0,n.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md"}},defaultVariants:{variant:"default",size:"default"}}),u=t.forwardRef((e,a)=>{let{className:r,variant:t,size:n,asChild:o=!1,...u}=e,f=o?s.g7:"button",m="Solicitar una consulta"===u.children,b=(0,i.jsx)(f,{className:(0,d.cn)(l({variant:t,size:n,className:r})),ref:a,...u});return m?(0,i.jsx)(c(),{href:"/contacto",children:b}):b});u.displayName="Button"},609:function(e,a,r){"use strict";r.d(a,{Ol:function(){return o},SZ:function(){return d},Zb:function(){return n},aY:function(){return l},ll:function(){return c}});var i=r(7437),t=r(2265),s=r(345);let n=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("div",{ref:a,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",r),...t})});n.displayName="Card";let o=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("div",{ref:a,className:(0,s.cn)("flex flex-col space-y-1.5 p-4",r),...t})});o.displayName="CardHeader";let c=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("h3",{ref:a,className:(0,s.cn)("text-xl font-semibold leading-none tracking-tight",r),...t})});c.displayName="CardTitle";let d=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("p",{ref:a,className:(0,s.cn)("text-sm text-muted-foreground",r),...t})});d.displayName="CardDescription";let l=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("div",{ref:a,className:(0,s.cn)("p-4",r),...t})});l.displayName="CardContent";let u=t.forwardRef((e,a)=>{let{className:r,...t}=e;return(0,i.jsx)("div",{ref:a,className:(0,s.cn)("flex items-center p-4",r),...t})});u.displayName="CardFooter"},345:function(e,a,r){"use strict";r.d(a,{cn:function(){return s}});var i=r(7042),t=r(4769);function s(){for(var e=arguments.length,a=Array(e),r=0;r<e;r++)a[r]=arguments[r];return(0,t.m6)((0,i.W)(a))}}},function(e){e.O(0,[326,413,603,114,971,472,744],function(){return e(e.s=78)}),_N_E=e.O()}]);