const User = require('./models/User');
require('./config/db')();

const batch1 = [
  'arvindkumargupta9247@gmail.com',
  'anishrein1@gmail.com',
  'mohitkandwalkaku@gmail.com',
  'ahujabhart786@gmail.com',
  'riyaatwal01@gmail.com',
  'pankajsharma82026@gmail.com',
  'kaurmandeep.1561@gmail.com',
  'kohlishruti98@gmail.com',
  'anmolnarula081@gmail.com',
  'muskaankataria10@gmail.com',
  'manisha832003@gmail.com',
  'kaursimrandeep078@gmail.com',
  'ishween3416@gmail.com',
  'muskankapoor1512@gmail.com',
  'divyabasotra0786@gmail.com',
  'shivanshmahajan192003@gmail.com',
  'loveenabansal27@gmail.com',
  'korotania90@gmail.com',
  'mandeepkaurbhangu7@gmail.com',
  'lovishdhingralove@gmail.com',
  'jaskaranbal05@gmail.com',
  'shivammahajan1918373@gmail.com',
  'jaskaranmaan76@gmail.com',
  'TSAURABH132@GMAIL.COM',
  'spreetkaur830@gmail.com',
  'judgeraifzr605@gmail.com',
  'pjeet4001@gmail.com',
  'neerajchandel009@gmail.com',
  'aksyjindal@gmail.com',
  'namankandhari.nk98@gmail.com',
  'kaurn3940@gmail.com',
  'darshanbuttar1955@gmail.com',
  'harshitajindal25@gmail.com',
  'sargamdeepkaur@gmail.com',
  'palak829y@gmail.com',
  'mannbhatia09@gmail.com',
  'parneetdhir@gmail.com',
  'Bholasidhu111@gmail.com',
  'maninderkaur0321@gmail.com',
  'gurjaapsingh2001@gmail.com',
  'lsbawa224@gmail.com',
  'Manavkanwar13@gmail.com',
  'damanjot797@gmail.com',
  'avneet3601@gmail.com',
  'kritikaa576@gmail.com',
  'akshitbahari3@gmail.com',
  'singhsatnamsingh765khosa@gmail.com',
  'shifalisingla4931@gmail.com',
  'rahuldigwal12@gmail.com',
  'singlah255@gmail.com',
  'sahildhanjal98@gmail.com',
  'shabnam4074@gmail.com',
  'lokrajgoyal83@gmail.com',
  'harronkhan07@gmail.com',
  'aulakhdeep1411@gmail.com',
  'milanshingala666@gmail.com',
  'Jassmanesh56@gmail.com',
  'insa422@gmail.com',
  'anmol.og004@gmail.com',
  'ajaysandhu6@gmail.com',
  'coollucky055@gmail.com',
  'pujitagrover03@gmail.com',
  'abhikajal8656@gmail.com',
  'bhatia.rajan786@gmail.com',
  'simranjitsinghsohal@hotmail.com',
  'amritpalsk1@gmail.com',
  'spreetkaur629@gmail.com',
  'rpalsingh715@gmail.com',
  'kaursimranjeet671@gmail.com',
  '17032001550@gndu.ac.in',
  'ridhimabehal475@gmail.com',
  'sushantsd08@gmail.com',
  'dattavijay@rediffmail.com',
  'navjeetnainewal2005@gmail.com',
  'skaur950187@gmail.com',
  'maniksingla475@gmail.com',
  'daminisachdeva2@gmail.com',
  'harneet1729@gmail.com',
  'jainpratibha858@gmail.com',
  'joth3202@gmail.com',
  'rk1020284@gmail.com',
  'buntysinghpjb@gmail.com',
  'kiranbrar1341@gmail.com',
  'gurdeeps73475@gmail.com',
  'chiragmahajan9867@gmail.com',
  'HARMANDEEPSINGH1001@GMAIL.COM',
  'HARDEEPEE@GMAIL.COM',
  'inderpreet2803kaur@gmail.com',
  'raghumalhotra3061999@gmail.com',
  'mishradipesh0@gmail.com',
  'khushichhabra502@gmail.com',
  'js166272@gmail.com',
  'chetangupta8816@gmail.com',
  'ashishgfzr@gmail.com',
  'gurinders485@gmail.com',
  'bhavdeep.rekhi99@gmail.com',
  'mansisahota54092@gmail.com',
  'singhsaini2324@gmail.com',
  'reetikamakkar710@gmail.com',
  'navjotkaurghuman36@gmail.com',
  'goyalltrisha@gmail.com',
  'kumarisuruchi23542@gmail.com',
  'bksajan0@gmail.com',
  'sahilprabhjeet54321@gmail.com',
  'chandpreet88@gmail.com',
  'kavitasingla2003@gmail.com',
  'sakshi1204sharma@gmail.com',
  'gaurabhazra2000@gmail.com',
  'missmittal11999@gmail.com',
  'himansha647@gmail.com',
  'hemraz999@gmail.com',
  'sandeepdhaliwal777@gmail.com',
  'latadevi509@gmail.com',
  'rajnishkumar883077@gmail.com',
  'preetkhush814@gmail.com',
  'preetlove78948@gmail.com',
  'sarita11gsp@gmail.com',
  'mannupuri25@gmail.com',
  'JAMESSAHOTA97@GMAIL.COM',
  'joban9876329619@gmail.com',
  'parteekgoyal118@gmail.com',
  'akprem6490@gmail.com',
  'mankooharpreet953@gmail.com',
  'rastisahu22@gmail.com',
  'heenamaurya2000@gmail.com',
  'pushpa98785@gmail.com',
  'Karanjotsinghdhillon600@gmail.com',
  'retikpassi1818@gmail.com',
  'gpalak352@gmail.com',
  'manav1901310@gmail.com',
  'lovepreetjassar@gmail.com',
  'contactat.rahulkumar@gmail.com',
  'akumar2153.ee19@chitkara.edu.in',
  'himanshumittal651@gmail.com',
  'sanamahuja2000@gmail.com',
  'manpreetsangral99@gmail.com',
  'dhanveersingh124925@gmail.com',
  'jaszimutiar@yahoo.in',
  'jagsirsinghkataria1@gmail.com',
  'gs097779@gmail.com',
  'mail2lakshmi009@gmail.com',
  'ranayuvrajsingh1111@gmail.com',
  'info.sandhukirat23@gmail.com',
  'mehakverma9463@gmail.com',
  'punjabistudios18@gmail.com',
  'amritaulakh1001@gmail.com',
  'janvisharma4593@gmail.com',
  'sharmamanvi51649@gmail.com',
  'jatinjindal148@gmail.com',
  'singhprabh1999@gmail.com',
  'jashanpreetsinghlotey@gmail.com',
  'kaur44122@gmail.com',
  '95lovish@gmail.com',
  'princesharma76214@gmail.com',
  'dheerajsharma21918@gmail.com',
  'sakshithakur63900@gmail.com',
  'kumarnaveen17205@gmail.com',
  'parneet07866@gmail.com',
  'bhaveshb2002@gmail.com',
  'ritikayadav.salon@gmail.com',
  'simranrana581@gmail.com',
  'abhinavsaini1412@gmail.com',
  'jaspal3kaur@gmail.com',
  'bnesh2001@gmail.com',
  'aasthamadaan23072003@gmail.com',
  'TAJINDER701@GMAIL.COM',
  'snehayadav43213@gmail.com',
  'shilpaprashar111@gmail.com',
  'shashinabha9217@gmail.com',
  'mahajan7231@gmail.com',
  'middhakashish2000@gmail.com',
  'kaurharmandeep186@gmail.com',
  'gurmanjotkaur06@gmail.com',
  'pahuldhillon@yahoo.com',
  'tanvi30hmb@gmail.com',
  'ipsg654321@gmail.com',
  'anmolchug066@gmail.com',
  'princerishi360@gmail.com',
  'engg.sukhwinderkaur@gmail.com',
  'Sahil1901366@gmail.com',
  'aryansingla135@gmail.com',
  'gabbargaming7@gmail.com',
  'aastha20092002@gmail.com',
  'sanjanakapoor307@gmail.com',
  'guptadeepali450@gmail.com',
  'devangidehra2000@gmail.com',
  'jsd48030@gmail.com',
  'Pooja2k.snl@gmail.com',
  'adkaur1412@gmail.com',
  'devganfiza19@gmail.com',
  'Singlachesta469@gmail.com',
  'nv886141@gmail.com',
  'goyalmuskan1612@gmail.com',
  'Shamshersohi2002@gmail.com',
  'manishlalwani6543@gmail.com',
  'nitin786pandey3@gmail.com',
  'deeputility2@gmail.com',
  '20ucs224@lnmiit.ac.in',
  'muskaanchoudhary115@gmail.com',
  'sukhappy81@gmail.com',
].map((d) => d.toLocaleLowerCase());

const batch2 = [
  'rmndpkr1712@gmail.com',
  'surbhisingla4428@gmail.com',
  '20sukhjinder18nm@gmail.com',
  'jaspreetkler74@gmail.com',
  'karan37848@gmail.com',
  'riyakochhar12@gmail.com',
  'harman7529@gmail.com',
  'singhjashanpreet210@gmail.com',
  'dhanpreetksoor20@gmail.com',
  'kumarishivam145@gmail.com',
  'Surinderkumar5441@gmail.com',
  'dimpleattri2517@gmail.com',
  'Vijaykumaaar0001@gmail.com',
  'riya2000garg@gmail.com',
  'nandi9990@gmail.com',
  'mehakverma946@gmail.com',
  'js5400130@gmail.com',
  'gagu01213@gmail.com',
  'keshavdixit15620028@gmail.com',
  'rajveerkaurgolewala12@gmail.com',
  'shikhanaithani2002@gmail.com',
  'vandnajindal18@gmail.com',
  'skatnoria2000@gmail.com',
  'g.s7092@gmail.com',
  'HS9855571863@gmail.com',
  'heenamandair@gmail.com',
  'Amiridsan@gmail.com',
  'monuattri325@gmail.com',
  'sahibjeets84@gmail.com',
  'sagart06@gmail.com',
  'Csmrollnopriyanka@gmail.com',
  'ritabindal63@gmail.com',
  'jagveersinghofficial9@gmail.com',
  'anoopjeet08@gmail.com',
  'sk6462090@gmail.com',
  'pranvirsingh222@gmail.com',
  'gargtushar175@gmail.com',
  'maankamal249@gmail.com',
  'renugarg568@gmail.com',
  'anishsood33333@gmail.com',
  'skbhasin29@gmail.com',
  'nehavohra070@gmail.com',
  'manchandasakshi048@gmail.com',
  'kvirpal380@gmail.com',
  'simrankaur2412mcw@gmail.com',
  'onlilalit@gmail.com',
  'dawinder2001.b@gmail.com',
  'manbirsidhu043@gmail.com',
  'ks9948225@gmail.com',
  'akshitsahore01@gmail.com',
  'hs3188248@gmail.com',
  'manmeetkaur1085301mcw@gmail.com',
  'souravmourya203@gmail.com',
  'loveykumar9464@gmail.com',
  'maninderkaur1308@gmail.com',
  'aggarwalyash00010@gmail.com',
  'simmi1883@gmail.com',
  'hnargis9@gmail.com',
  'sharjinder335@gmail.com',
  'sainisimranjeet927@gmail.com',
  'sk20012404@gmail.com',
  'kamalkansal53@gmail.com',
  'garrychauhan13@gmail.com',
  'gurjotk995@gmail.com',
  'diyasethi2629@gmail.com',
  'manjotsanipur@gmail.com',
  'manishmanish3334@gmail.com',
  'pritish3340@gmail.com',
  'abhinavmehtabatala1@gmail.com',
  'abhaytiwari2810@gmail.com',
  'harshku4578@gmail.com',
  'deepsooch33@gmail.com',
  'siamandeep7@gmail.com',
  'srishtibandha56@gmail.com',
  'gargchahat397@gmail.com',
  'harjinderk7837@gmail.com',
  'akumar3_be18@thapar.edu',
  'gluthra042@gmail.com',
  'sc07172001@gmail.com',
  'taranvirdhillion@gmail.com',
  'jainkarnika2207@gmail.com',
  'krantigupta9814674454@gmail.com',
  '2492vandana1432nm@gmail.com',
  'baljindergaggu2@gmail.com',
  'arnamchaursia@gmail.com',
  'mohitdhawan02@gmail.com',
  'harisharyan69@gmail.com',
  'sm325642@gmail.com',
  'Rajanbabrah056@gmail.com',
  'seetakhammy@gmail.com',
  'aasthatiwari214@gmail.com',
  'gurpreetmeelu900@gmail.com',
  'na5774770@gmail.com',
  'kunalsaini690@gmail.com',
  'herryevence@gmail.com',
  'amitkumarpatil51@gmail.com',
  'Sarabjeettamber97@gmail.com',
  'tarunsharma9855@gmail.com',
  'anmoldep3@gmail.com',
  'mahajansaab490@gmail.com',
  'chandandeepkumari657@gmail.com',
  'apassi58@gmail.com',
  'maan20539@gmail.com',
  'lkakkar100@gmail.com',
  'jaspreetsinghg178@gmail.com',
  'prabh.singh6730@gmail.com',
  'ankitapalwa.ap@gmail.com',
  'rajugurpreet68@gmail.com',
  'sonu65629@gmail.com',
  'gopikananda115@gmail.com',
  'Kumariekta162@gmail.com',
  'kunalmehra171@gmail.com',
  'bainsdilpreet1231@gmail.com',
  'ramymarch666@gmail.com',
  'navjotkaur66305@gmail.com',
  'surgeet543@gmail.com',
  'ridhamsingla1108@gmail.com',
  'rohitnobi555@gmail.com',
  'sakshikd02001@gmail.com',
  'ishikaarora5308@gmail.com',
  'bhavya.soni0099@gmail.com',
  'devangchopra@gmail.com',
  'bhupinder6284313914@gmail.com',
  'navi69107@gmail.com',
  'mohitkumar7860608@gmail.com',
  'diyabansal0110@gmail.com',
  'soodaditya86@gmail.com',
  'anchalgoyal887@gmail.com',
  'nitishk82832@gmail.com',
  'kartik00410@gmail.com',
  'mandeep010294@gmail.com',
  'Singlaamisha.1211@gmail.com',
  'sharmashivam90231@gmail.com',
  'ranikanchan718@gmail.com',
  'abhinashabhi66100@gmail.com',
  'harpeetsk919@gmail.com',
  'mansisharmaanju2001@gmail.com',
  'sukhmansaini623@gmail.com',
  'preetpaul2602@gmail.com',
  'vermamanik73@gmail.com',
  'rahul.sen99.rs@gmail.com',
  'jatingupta78862@gmail.com',
  'kkiran6885@gmail.com',
  'palakgoyal734@gmail.com',
  'arjung938@gmail.com',
  'rahuldutt375@gmail.com',
  'shreysaggar0912@gmail.com',
  'divyanshukataria01@gmail.com',
  'jindalchirag39099@gmail.com',
  'shubhiawasthi.9852@gmail.com',
  'aabid5800@gmail.com',
  'sharmavanshika91105@gmail.com',
  'narinderromana5911@gmail.com',
  'rajk0723577@gmail.com',
  'nitikaamitloomba@gmail.com',
  'pk6540893@gmail.com',
  'yugvansh.s@gmail.com',
  'ms2351491@gmail.com',
  'poonamjeetkaur140@gmail.com',
  'sshivika11@gmail.com',
  'sujansingh1673@gmail.com',
  'vanshitamahajan1401@gmail.com',
  'thakurg703@gmail.com',
  'thakurdeepanshi5@gmail.com',
  'insa3002@gmail.com',
  'amneeshsingh5@gmail.com',
  'divyanshkalia10012003@gmail.com',
  'ira.garg2003@gmail.com',
  'CHOUDHARY.SHUBHAM61@GMAIL.COM',
  'muskanchhabra360@gmail.com',
  'rishavbhaiaur123@gmail.com',
  'bhuvanarora0507@gmail.com',
  'GURDEEPSB4@GMAIL.COM',
  'jainsam1311@gmail.com',
  'makkarsurbhi1511@gmail.com',
  'jaindrishti2003@gmail.com',
  'harshit9525@gmail.com',
  'lovepreetkaur98553@gmail.com',
  'honey001771@gmail.com',
  'aleena4002@gmail.com',
  'jesycakochhar4@gmail.com',
  'manyatjindal1512@gmail.com',
  'jotmehak82@gmail.com',
  'jaskiratsingh.manjit@gmail.com',
  'Tanvir.kumar.39@gmail.com',
  'deendyalbca@gmail.com',
  'ranibhawna364@gmail.com',
  'sidhumanjot751@gmail.com',
  'kaushal.amit18@gmail.com',
  'damanjeetkaur123456789@gmail.com',
  'amritvirdi1122@gmail.com',
  'sainmarry888@gmail.com',
  'kumarjeevan072@gmail.com',
  'harvindersingh4147@gmail.com',
  'iamarshdeepsidhu@gmail.com',
  'karan210502@gmail.com',
  'harnoorsingh836@gmail.com',
  'zeeshandehlvi@gmail.com',
  'stejveer1470@gmail.com',
  'kaurparneet604@gmail.com',
].map((d) => d.toLocaleLowerCase());

const batch3 = [
  'misspayal26@gmail.com',
  'sumitchetal@gmail.com',
  'vicky8singh99@gmail.com',
  'mohitbajaj306@gmail.com',
  'nusratjahan8528@gmail.com',
  'akankshagarg886@gmail.com',
  'vaibhavsharma950170@gmail.com',
  'rathorgagan904@gmail.com',
  'sachdeva.jp@gmail.com',
  'harshitarora.jld@gmail.com',
  'singlahimani068@gmail.com',
  'poojarani3018@gmail.com',
  'muktajoshi9330@gmail.com',
  'prabhat.learn@protonmail.com',
  'ayushmanroy60@gmail.com',
  'kkhehra040@gmail.com',
  'nimertasabi17@gmail.com',
  'anu.goyal11421@gmail.com',
  'triyanberi2809@gmail.com',
  'Sonu65629@gmail.com',
  'saroyamansi90@gmail.com',
  'rkbanger83@gmail.com',
  'tusharnarula141@gmail.com',
  'yadavgautam2003@gmail.com',
  'sainiumesh666@gmail.com',
  'hitanshu.vij@gmail.com',
  'engrmhanif@outlook.com',
  'mukesh.k.g9463@gmail.com',
  'amandeep13.2000@gmail.com',
  'rsh1982002@gmail.com',
  'dikshadhanda37@gmail.com',
  'jjscjashan03@gmail.com',
  'omdhawan02@gmail.com',
  'bhuwankumar003@gmail.com',
  'geetikas36789@gmail.com',
  'tejdhaliwal77188@gmail.com',
  'simmisakshi1503@gmail.com',
  'pranshusharma712@gmail.com',
  'arshpreetmundra14@gmail.com',
  'kulwindersharma2000a@gmail.com',
  'armaanjit1999@gmail.com',
  'mauryanitesh077@gmail.com',
  'ishnoor18@gmail.com',
  'harshanand2004100@gmail.com',
  'phull.kanav@gmail.com',
  'ashwinmohan10234@gmail.com',
  'ns1733423@gmail.com',
  'kartika733318@gmail.com',
  'Piyushgupta1999.pg@gmail.com',
  'kaurmanntript@gmail.com',
  'vishalthakur3299@gmail.com',
  'bains44a@gmail.com',
  'guptaakshit542@gmail.com',
  'sejala709@gmail.com',
  'mohitmgg87@gmail.com',
  'nitishmahant02@gmail.com',
  'realgurshaan101@gmail.com',
  'jaspreetkaur7311@gmail.com',
  'anjanavasu1810@gmail.com',
  'yashenders@gmail.com',
  'bansalmeghs2000@gmail.com',
  'meadamann2002@gmail.com',
  'nareshw34@gmail.com',
  'jatingarg511@gmail.com',
  'ksbhatti47@gmail.com',
  'pranavnc0306@gmail.com',
  'mohitp.ec.18@nitj.ac.in',
  'manjitkumar3065@gmail.com',
  'skansal_be18@thapar.edu',
  'avinashrajput8427@gmail.com',
  'neeraj1801346@gmail.com',
  'jasairway442@gmail.com',
  'arnavdhiman47@gmail.com',
  'amitmonga435@gmail.com',
  'Rawatmeenakshi0506@gmail.com',
  'chodhavarun@gmail.com',
  '2207.riya@gmail.com',
  'shiwangkashyap50@gmail.com',
  'preetjass2507@gmail.com',
  'ndhiman263@gmail.com',
  'plaharavneet@gmail.com',
  'kaurmandeep07289@gmail.com',
  'ridhi.manchanda007@gmail.com',
  'ravneet32370@gmail.com',
  'gurpreet786kapoor@gmail.com',
  'ak2861416@gmail.com',
  'dutta.jatin810@gmail.com',
  'amritsodhi69@gmail.com',
  'kamaljeet.ghagga.02@gmail.com',
  'uditarora06@gmail.com',
  'vermasonu7889@gmail.com',
  'Deepanshi05122002@gmail.com',
  'sainiarshjot@gmail.com',
  'sarinsaket@gmail.com',
  '10112001mg@gmail.com',
  'jagjotsran3444@gmail.com',
  'ai5039551@gmail.com',
  'sangamsuraj18@gmail.com',
  'singhsahil08275@gmail.com',
  'thakurpratham3011@gmail.com',
  'as744singh@gmail.com',
  'anjali.rathore2025@gmail.com',
  'puneetgarg14@gmail.com',
  'imrajveer1311@gmail.com',
  'lovishbir@yahoo.com',
  '20navjotkaur02nm@gmail.com',
  'deepjaura8@gmail.com',
  'kt113241@gmail.com',
  'niks4u93@gmail.com',
  'tanviarora554@gmail.com',
  'davinderaulakh058@gmail.com',
  'aanchalsemwal220@gmail.com',
  'sarmalm7@gmail.com',
  'anjalipreet0411@gmail.com',
  'johnsondungdung97@gmail.com',
  'sakshamkataria100@gmail.com',
  'ankushsharma1076@gmail.com',
  'gpsnoor05@gmail.com',
  '2018maz0006@iitrpr.ac.in',
  'megha.cs2020@gmail.com',
  '7715mohit@gmail.com',
  'deepaksandhar58@gmail.com',
  'itsjaskarn22@gmail.com',
  'kaurjashman02@gmail.com',
  'kaurlabhpreet63@gmail.com',
  'jagroopdaba@gmail.com',
  'meenakshikalotra4@gmail.com',
  'abhinavthapliyal5@gmail.com',
  'jk0224460@gmail.com',
  'jas123kamal@gmail.com',
  'yakshinasharma91@gmail.com',
  'abhishekchauhan27082002@gmail.com',
  'kamal777kamalm@gmail.com',
  'preetkamal939@gmail.com',
  'vinit9464913@gmail.com',
  'mehakdeepsingh240024@gmail.com',
  'singhkjs5665@gmail.com',
  'shruti6703@gmail.com',
  'lizarani9998@gmail.com',
  'me2ips9800@gmail.com',
  'rvirmani_be18@thapar.edu',
  'rajank.cs.18@nitj.ac.in',
  'mehakmehrotra218@gmail.com',
  'geetikagupta948@gmail.com',
  'harjee777@gmail.com',
  'mahajanshama57@gmail.com',
  'mohitg593@gmail.com',
  'thakurbhoomika338@gmail.com',
  'ansh1409sh@gmail.com',
  'vbagga73@gmail.com',
  'pri28may.04@gmail.com',
  'rakshit11.sawhney@gmail.com',
  'bgoyal1471@gmail.com',
  'sonali.saini22@gmail.com',
  'khayuvraj@gmail.com',
  'aryanseth2001@gmail.com',
  'sharma.sahil5361@gmail.com',
  'dhindsa9757@gmail.com',
  'dishaasharma1917@gmail.com',
  'arpitpunj@gmail.com',
  'khushbookumari18432@gmail.com',
  'khera.uma2000@gmail.com',
  'csecec.1802121@gmail.com',
  'jainpurti17@gmail.com',
  'hirajasmeet@gmail.com',
  'goyalnitika609@gmail.com',
  'sekhon.gkaur@gmail.com',
  'nagraamrit05@gmail.com',
  'chetanpahwa1999@gmail.com',
  'khajuriasiddhant@gmail.com',
  'simz.kaur.3@gmail.com',
  'namangupta1805@gmail.com',
  'abhic2800@gmail.com',
  'sharma2015adarsh@gmail.com',
  'thapasahil935@gmail.com',
  'vivekkmittal01@gmail.com',
  'deepanshisharma05@gmail.com',
  'kunwernaveesh@gmail.com',
  'radhikacisfg@gmail.com',
  'gitanshu.vij1305@gmail.com',
  'lovepreetsingh17913@gmail.com',
  'amehndiratta2609@gmail.com',
  'shuntykahlon28@gmail.com',
  'anmolpreet191@gmail.com',
  'kkmadhav002@gmail.com',
  'dupinder12606@gmail.com',
  'sanpreets730@gmail.com',
  'aditya01256@gmail.com',
  'thakurgeetanjali1999@gmail.com',
  'inderdeep1309@gmail.com',
  'balwinderk2711@gmail.com',
  'sainigagan2001@gmail.com',
  'prabhjas9900@gmail.com',
  'kritiaggarwal2002@gmail.com',
  'anku41061@gmail.com',
  'tisnoorkaurnoor@gmail.com',
  'amits4894@gmail.com',
  'rubinakamboj2019@gmail.com',
  'shikha03tomar@gmail.com',
  'dikshasaili906@gmail.com',
].map((d) => d.toLocaleLowerCase());

const batch4 = [
  'vbagga73@gmail.com',
  'pri28may.04@gmail.com',
  'chopraontheride@gmail.com',
  'rakshit11.sawhney@gmail.com',
  'bgoyal1471@gmail.com',
  'sonali.saini22@gmail.com',
  'khayuvraj@gmail.com',
  'aryanseth2001@gmail.com',
  'sharma.sahil5361@gmail.com',
  'dhindsa9757@gmail.com',
  'dishaasharma1917@gmail.com',
  'arpitpunj@gmail.com',
  'khushbookumari18432@gmail.com',
  'karanbajwa0031@gmail.com',
  'khera.uma2000@gmail.com',
  'csecec.1802121@gmail.com',
  'jainpurti17@gmail.com',
  'hirajasmeet@gmail.com',
  'goyalnitika609@gmail.com',
  'sekhon.gkaur@gmail.com',
  'nagraamrit05@gmail.com',
  'chetanpahwa1999@gmail.com',
  'khajuriasiddhant@gmail.com',
  'simz.kaur.3@gmail.com',
  'navdeepwaraich7670@gmail.com',
  'aakashguptanov10@gmail.com',
  'namangupta1805@gmail.com',
  'abhic2800@gmail.com',
  'rantti1409@gmail.com',
  'sharma2015adarsh@gmail.com',
  'thapasahil935@gmail.com',
  'vivekkmittal01@gmail.com',
  'deepanshisharma05@gmail.com',
  'kunwernaveesh@gmail.com',
  'radhikacisfg@gmail.com',
  'gitanshu.vij1305@gmail.com',
  'lovepreetsingh17913@gmail.com',
  'amehndiratta2609@gmail.com',
  'shuntykahlon28@gmail.com',
  'anmolpreet191@gmail.com',
  'bhavyasehgal4241@gmail.com',
  'kkmadhav002@gmail.com',
  'dupinder12606@gmail.com',
  'sanpreets730@gmail.com',
  'aditya01256@gmail.com',
  'thakurgeetanjali1999@gmail.com',
  'inderdeep1309@gmail.com',
  'balwinderk2711@gmail.com',
  'sainigagan2001@gmail.com',
  'prabhjas9900@gmail.com',
  'kritiaggarwal2002@gmail.com',
  'anku41061@gmail.com',
  'tisnoorkaurnoor@gmail.com',
  'amits4894@gmail.com',
  'rubinakamboj2019@gmail.com',
  'shikha03tomar@gmail.com',
  'dikshasaili906@gmail.com',
  'svandana499@gmail.com',
  'sharmavaibhav884@gmail.com',
  'khushirajput1632003@gmail.com',
  'agg.rachit14@gmail.com',
  'saloniverma1981@gmail.com',
  'aroravaibhav102@gmail.com',
  'dhingraprerna72@gmail.com',
  'arshdeep33455134@gmail.com',
  'paminderkaur03@gmail.com',
  'muskaanjindal1204@gmail.com',
  'punyaaminocha@gmail.com',
  'simranrana5477@gmail.com',
  'mehtab.arsr@gmail.com',
  'sukhmanvirdi022@gmail.com',
  'dheerajnagpal21081999@yahoo.com',
  'tinna.shivaz@gmail.com',
  'jashnpreetkaur2000@gmail.com',
  'akshatbatra25@gmail.com',
  'sukhdevsingh152023@gmail.com',
  'singlasona30@gmail.com',
  'ishpreetsingh45@gmail.com',
  'sanhotrasakshi87@gmail.com',
  'j78140@gmail.com',
  'devesh421@outlook.com',
  'loveshgoel30@gmail.com',
  'harshkheri1998@gmail.com',
  'Avneesh.6070@gmail.Com',
  'mahant.radhika2000@gmail.com',
  'harshtandon.cse@gmail.com',
  'ssheetalsharda@gmail.com',
  '1809161@sbsstc.ac.in',
  'yuktahasija01@gmail.com',
  'ritikgarg1235@gmail.com',
  'riyagupta23041999@gmail.com',
  'kumarjugesh48@gmail.com',
  'ravinderchadha1233@gmail.com',
  'dheeraj.kapoor602@gmail.com',
  'sahibisking19@gmail.com',
  'divyakohli1234@gmail.com',
  'ps331304@gmail.com',
  'syalsahil57551@gmail.com',
  'aujlagurdeep24@gmail.com',
  'kirandeol294@gmail.com',
  'guptamanish31337@gmail.com',
  'rupinder7565@gmail.com',
  'hasijashallu10@gmail.com',
  'ashu.ginni33@gmail.com',
  'ajindal2_be18@thapar.edu',
  'maurya.sharma234@gmail.com',
  'bhavberi@gmail.com',
  'csecec.1902962@gmail.com',
  'apurvsiwach200@gmail.com',
  'karmandhanjal@gmail.com',
  'aryangangotia34@gmail.com',
  'ramandeep7816413@gmail.com',
  'pranshumuthreja8@gmail.com',
  'arshdeepchahal4641@gmail.com',
  'aditya.thakur018@gmail.com',
  'priyanshus.ee.19@nitj.ac.in',
  'vaibhav.kapoor0123@gmail.com',
  'm.gaggann@gmail.com',
  'divyam1234gupta.ldh@gmail.com',
  'nthind_be18@thapar.edu',
  'hardiksachdeva04@gmail.com',
  'swatidame@gmail.com',
  'royalharshpreetsingh@gmail.com',
  'singhamritpal4153@gmail.com',
  'imakathuria@gmail.com',
  'primroserandhawa@gmail.com',
  'jasnoorsingh0902@gmail.com',
  'priyankarana1254@gmail.com',
  'varinderjeetk7@gmail.com',
  'sidkalsi32@gmail.com',
  'singhpakhar4u@gmail.com',
  'suryavigneshkapuganti@gmail.com',
  'hammuharman27@gmail.com',
  '781481mk@gmail.com',
  'jaskarankataria99@gmail.com',
  'priyankaghorela01@gmail.com',
  'shivalik143521@gmail.com',
  'partima9127606@gmail.com',
  'yashika.sen14@gmail.com',
  'gaurang7400@gmail.com',
  'harmanpreetkaurbirdi88@gmail.com',
  'shubham.kr7696@gmail.com',
  'sunilsemplay22@gmail.com',
  'aashishg146@gmail.com',
  'hr479514@gmail.com',
  'akhil_aggarwal18@yahoo.com',
  'preeti241912@gmail.com',
  'nnandita_be19@thapar.edu',
  'simple199880@gmail.com',
  'gurmeetrai178@gmail.com',
  'komalfazilka@gmail.com',
  'sehajbakshi12@gmail.com',
  'riteshmr4@gmail.com',
  'vishudutta0303@gmail.com',
  'parasbansal.pb25@gmail.com',
  'dipinjassal89@gmail.com',
  'kushsingla58@gmail.com',
  '17031987756@gndu.ac.in',
  'amayavasthi12@gmail.com',
  'ssharanyab@gmail.com',
  'vishaw1729@gmail.com',
].map((d) => d.toLocaleLowerCase());

async function allot() {
  for (let i = 0; i < batch1.length; i++) {
    await User.updateOne({ email: batch1[i] }, { batch: 1 });
  }

  for (let i = 0; i < batch2.length; i++) {
    await User.updateOne({ email: batch2[i] }, { batch: 2 });
  }

  for (let i = 0; i < batch3.length; i++) {
    await User.updateOne({ email: batch3[i] }, { batch: 3 });
  }

  for (let i = 0; i < batch4.length; i++) {
    await User.updateOne({ email: batch4[i] }, { batch: 4 });
  }

  console.log('done');
}

async function testing() {
  let c = 0;
  for (let i = 0; i < batch3.length; i++) {
    const user = await User.findOne({ email: batch3[i] });
    if (user) {
      c++;
    }
    console.log(c);
    await User.updateOne({ email: batch3[i] }, { batch: 3 });
  }
}

setTimeout(testing, 1000);
