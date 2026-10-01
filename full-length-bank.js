const english=require('./full-length-english.json');
const passages=require('./full-length-passages.json');
const questions=[];
const shortPrompts={
  21:'Which description best captures the passage as a whole?',22:'If viewers had heard the debate without seeing it, which outcome does the passage suggest was more likely?',
  23:'What concern did critics raise about televised debates?',24:'What did the broadcast allow Kennedy to demonstrate to viewers?',
  25:'Which detail supports the passage\'s final claim?',26:'Why did the first debate draw some viewers who usually ignored politics?',
  27:'What question ties together the ice passage?',28:'Why does the author bring up lead and diamond near the end?',
  29:'In Faraday\'s explanation, what makes two ice cubes stick together?',30:'Which finding bears most directly on the claim that ice has a liquid-like surface?',
  31:'What keeps the ice surface from being a true liquid, according to the laboratory findings?',32:'Which observation is hardest for a friction-only explanation of slipperiness to explain?',
  33:'What purpose does the discussion of pressure serve in the passage?',34:'Which statement best conveys the main point about Marsh?',
  35:'Why were Marsh\'s ideas unusual in his day?',36:'Why does the author describe the date of Man and Nature as surprising?',
  37:'What evidence lends support to the accuracy of Marsh\'s theories?',38:'Which detail supports the claim that Marsh accepted some changes to nature?',
  39:'Which idea of Marsh\'s later became central to environmentalism?',40:'What is the main subject of the wind-power passage?',
  41:'Which evidence shows windmills mattered in the American West?',42:'Why list the kinds of work windmills performed?',
  43:'What changed after the 1950s that reduced farms\' reliance on wind-generated electricity?',44:'Which statement best reflects the author\'s expectation for wind energy?',
  45:'What task did Dutch windmills notably help accomplish?',46:'What does the Pueblo passage chiefly explain?',
  47:'Why did the excavators need the so-called key beam?',48:'Why explain the causes of wide and narrow growth rings?',
  49:'Which finding helped explain the abandonment of the Pueblo villages?',50:'Why did the earliest comparison fail to yield an exact date for the abandoned buildings?',
  51:'Why compare Pueblo logs with those from the Hopi village?',52:'Why did many 1930s viewers connect with American Scene painting?',
  53:'Which subject would an Urban Realist most likely paint?',54:'How is Hopper\'s view of city life different from the Urban Realists\'?',
  55:'What is the role of the passage\'s fourth paragraph?',56:'What does “without apology” imply about Hopper\'s choices?',
  57:'Why might Regionalist work have remained more popular than Urban Realist work?'
};
const englishExplanations={
  1:'Sentence 1 joins two independent clauses with only a comma; it needs a period or semicolon.',
  2:'The opening phrase must modify the debate-team members, the people promoting their club.',
  3:'The paragraph narrates past events, so the present-tense verb in sentence 3 breaks tense consistency.',
  4:'A comma is needed after Italy to open the nonessential clause about the landmark.',
  5:'Naming the materials and saying the engineers tested them is more precise than vague wording.',
  6:'The replacement should claim that the entire community benefits from using the public library.',
  7:'The growth of digital media enables fast communication; the combined sentence should show that cause and effect.',
  8:'Programs that bring community members together directly support the claim about human connection.',
  9:'The following example adds a similar point, so “Similarly” fits the logical transition.',
  10:'The formal wording about library resources matches the passage better than conversational phrasing.',
  11:'Sentence 19 fits before sentence 17, where the paragraph shifts to that supporting idea.',
  12:'Sentence 13 does not advance the passage\'s argument about the library and should be removed.',
  13:'A conclusion should urge community members to maintain, support, and use the library.',
  14:'The combined sentence must connect difficult travel with routes around or through the mountains.',
  15:'The added sentence should introduce the tunnel as the exceptional project developed in the passage.',
  16:'The comparison makes the boring machine\'s cutting action easier to picture.',
  17:'The sentence about concrete belongs after the sentence describing excavation, in construction order.',
  18:'The next detail is an example, so “For example” signals its role.',
  19:'Sentence 17 is unrelated to the central topic and weakens the paragraph.',
  20:'The ending should return to ingenuity and persistence overcoming a difficult mountain barrier.',
  21:'The passage recounts the first televised presidential debate and its political impact.',
  22:'The passage suggests Nixon\'s experience would have played better without the visual contrast on television.',
  23:'Critics worried that television performance could be mistaken for presidential fitness.',
  24:'Kennedy appeared poised, charming, and confident despite concerns about his youth.',
  25:'Nixon\'s greater experience and name recognition explain why a radio-only debate might have helped him.',
  26:'The novelty of seeing a political debate on television attracted viewers who usually ignored politics.',
  27:'The passage compares explanations for why ice feels slippery.',
  28:'Lead and diamond show that ice is not the only solid with a slippery surface.',
  29:'Faraday proposed that a thin surface layer freezes when the two cubes touch.',
  30:'The 1996 measurements supplied evidence for a liquid-like layer at the ice surface.',
  31:'The surface molecules vibrate rather than moving freely like molecules in a true liquid.',
  32:'A person can slide while standing still, without motion producing frictional heat.',
  33:'Presenting pressure alongside other explanations shows scientists have proposed several mechanisms.',
  34:'Marsh warned that human actions could seriously alter nature, influencing later conservation.',
  35:'People of his era did not understand the long-term environmental effects of their actions.',
  36:'The book appeared about a century before its ideas gained broad acceptance.',
  37:'Modern environmental science treats the balance Marsh described as essential.',
  38:'Marsh praised beneficial human projects while urging responsible management.',
  39:'His warning that human activity can damage the environment became central to the later movement.',
  40:'The passage traces several uses of wind energy across history.',
  41:'Windmills supplied water to farms and livestock in remote western areas.',
  42:'The varied tasks demonstrate how broadly useful windmills were.',
  43:'Centralized electric power reached most farms, reducing the need for their own wind generation.',
  44:'The author sees wind farms as a potentially important electricity source.',
  45:'Dutch windmills pumped water from bogs so the land could be used.',
  46:'Matching tree-ring patterns let archaeologists date construction at the Pueblo sites.',
  47:'The key beam connected an undated ring sequence to a dated one.',
  48:'Weather affects ring width, making matching patterns across logs possible.',
  49:'The tree-ring record revealed a long drought near the time the villages were abandoned.',
  50:'The original Pueblo logs had no overlapping pattern with the established chronology.',
  51:'The comparison searched for matching ring patterns that could anchor the undated logs.',
  52:'American Scene paintings showed familiar people and places during the Depression.',
  53:'Urban Realists depicted the hardship of city workers, such as people leaving a factory.',
  54:'Hopper could find beauty even in monotonous or worn urban scenes.',
  55:'The paragraph focuses on Hopper as an artist who did not fit neatly into the other groups.',
  56:'Hopper did not feel he had to defend the ordinary places and people he chose to paint.',
  57:'Regionalist scenes offer a more nostalgic view of American life than Urban Realist scenes.'
};
for(const item of english){
  const skill=item.source<=5?'Editing':item.source<=20?'Revising and editing':'Reading comprehension';
  let prompt=shortPrompts[item.source]||item.prompt,stimulus=null;
  if(item.source<=5){
    const start=Math.max(prompt.lastIndexOf(' Which '),prompt.lastIndexOf(' How '),prompt.lastIndexOf(' What '));
    if(start>0){stimulus=prompt.slice(0,start).trim();prompt=prompt.slice(start).trim();}
  }
  questions.push({id:'FL-'+item.source,source:item.source,subject:'English',skill,level:1,difficulty:'Mixed',group:item.group,
    prompt,stimulus,choices:item.choices,answer:item.answer,
    explanation:englishExplanations[item.source],
    passage:passages[item.group]||null,diagram:null});
}
function add(source,skill,prompt,choices,answer,explanation){
  if(choices.length!==4||new Set(choices).size!==4||answer<0||answer>3)throw new Error('Invalid Math item '+source);
  questions.push({id:'FL-'+source,source,subject:'Math',skill,level:1,difficulty:'Mixed',group:'math',prompt,choices,answer,explanation,passage:null,diagram:null});
}
add(58,'Counting','How many five-digit arrangements use each of the digits 2, 3, 5, 7, and 8 exactly once?',['25','60','120','625'],2,'There are 5! = 5 x 4 x 3 x 2 x 1 = 120 arrangements.');
add(59,'Equations','A number x satisfies (147 - x) / 12 = 12. What is x?',['3','12','15','27'],0,'147 - x = 144, so x = 3.');
add(60,'Signed numbers','Evaluate -6 - (-5) + 4.2 - 3 - 9.6.',['-13.6','-9.4','-3.4','3.4'],2,'The expression is -6 + 5 + 4.2 - 3 - 9.6 = -3.4.');
add(61,'Percent','A 60-page chapter is 20% of a book. How many pages are in the entire book?',['120','240','300','360'],2,'60 / 0.20 = 300 pages.');
add(62,'Angles','Four lines meet at a point. Four consecutive angles along one side of a straight line are 25°, 30°, 60°, and y°. What is y?',['55°','65°','75°','115°'],1,'Angles on one side of a straight line total 180°, so y = 180 - 25 - 30 - 60 = 65°.');
add(63,'Substitution','If x = 9 and y = -7, evaluate x(x - 2y).',['63','81','144','207'],3,'9[9 - 2(-7)] = 9(23) = 207.');
add(64,'Geometry','A triangle has two interior angles measuring 50° and 70°. What is the third angle?',['50°','60°','70°','120°'],1,'The interior angles add to 180°, leaving 60°.');
add(65,'Algebra','Positive numbers satisfy M = 3N = P/4 = Q + 5 = R/7. Which variable is greatest?',['M','P','Q','R'],3,'Let the common positive value be k. Then R = 7k, P = 4k, M = k, N = k/3, and Q = k - 5.');
add(66,'Proportions','A floor uses 3 bundles of material for every 96 square feet. How many bundles cover 416 square feet at the same rate?',['10','12','13','16'],2,'One bundle covers 32 square feet, and 416 / 32 = 13.');
add(67,'Inequalities','A package costs $10.50, or separate sheets cost $0.15 each. What is the greatest whole number of sheets for which buying separately costs less?',['69','70','71','75'],0,'0.15n < 10.50, so n < 70; the largest whole number is 69.');
add(68,'Linear change','At 1 p.m. a thermometer reads 8°F. It drops 3°F each hour. What does it read at 7 p.m.?',['-18°F','-10°F','-8°F','10°F'],1,'Six hours pass, and 8 - 6(3) = -10°F.');
add(69,'Ratios','A jar has red, blue, and green beads in a 15:7:3 ratio, with 75 beads total. Two blue beads are replaced by two green beads. What is the new red-to-green ratio?',['15:3','21:11','45:11','45:9'],2,'The original counts are 45 red, 21 blue, 9 green. Green becomes 11; the ratio is 45:11.');
add(70,'Data','A dessert survey recorded 42 cake, 23 pie, 47 cookies, and 48 ice cream choices. What percent chose ice cream?',['23%','28%','30%','48%'],2,'There are 160 responses, and 48 / 160 = 0.30.');
add(71,'Least common multiple','Three signals repeat every 24, 6, and 18 minutes. If they sound together now, after how many minutes will they next sound together?',['36','48','72','144'],2,'The least common multiple of 24, 6, and 18 is 72.');
add(72,'Rates','A bakery needs 15 dozen rolls for 200 guests. At the same rate, approximately how many dozen rolls should it prepare for 300 guests?',['20','22','23','30'],2,'15 x 300 / 200 = 22.5 dozen, so round up to 23 dozen.');
add(73,'Probability','A basket has 5 apples, 3 grapes, and 6 other pieces of fruit. What is the probability that a randomly selected piece is not an apple?',['5/14','3/7','9/14','9/5'],2,'There are 9 non-apples among 14 pieces.');
add(74,'Circle area','A large circular plate has radius 20 cm; a smaller circle cut from it has circumference 20π cm. What area remains?',['100π cm²','200π cm²','300π cm²','400π cm²'],2,'The small radius is 10 cm. Difference: π(20² - 10²) = 300π cm².');
add(75,'Area and money','Ads cost $200 for a quarter page, $350 for a half page, and $600 for a full page. A buyer purchases equal numbers of all three sizes for $11,500. How many pages of ad space is that in total?',['10','15','17.5','20'],2,'Each set costs $1,150, so 10 sets were bought. Their total area is 10(1/4 + 1/2 + 1) = 17.5 pages.');
add(76,'Coordinate plane','Which ordered pair has a y-coordinate greater than its x-coordinate?',['(4, 1)','(-2, -4)','(1, 4)','(3, 3)'],2,'At (1, 4), 4 > 1.');
add(77,'Equations','If 36 / y = 4x and y = 3, what is x?',['2','3','9','12'],1,'36 / 3 = 12 = 4x, so x = 3.');
add(78,'Segments','Y lies between X and Z. XY = 20 cm and YZ is 3/5 of XY. Find XZ.',['12 cm','28 cm','32 cm','40 cm'],2,'YZ = 12 cm, so XZ = 20 + 12 = 32 cm.');
add(79,'Money','Ribbon costs $8 per yard. What is the total for 1 3/4 yards after 8% sales tax?',['$14.00','$14.80','$15.12','$15.40'],2,'Pre-tax price is 1.75(8) = $14; after tax it is 14(1.08) = $15.12.');
add(80,'Number line','Point N is at 1 1/3 on a number line. Point M is 5 5/6 units to the left of N. What is M?',['-7 1/6','-4 1/2','-3 1/2','4 1/2'],1,'1 1/3 - 5 5/6 = 8/6 - 35/6 = -27/6 = -4 1/2.');
add(81,'Ratios','An 8-gram alloy contains metals in the ratio 177:12:7:4. How many grams correspond to the metal with 12 parts?',['0.28','0.48','0.96','1.20'],1,'There are 200 parts total; 8(12/200) = 0.48 gram.');
add(82,'Averages','A player averages 15 points over 3 games, then scores 27 in a fourth game. What is the new average?',['16','18','20','21'],1,'The total is 3(15) + 27 = 72; 72 / 4 = 18.');
add(83,'Volume','A 4,320-liter tank is one-third full. How many kiloliters fill it completely?',['1.44','2.16','2.88','4.32'],2,'The missing two-thirds is 2,880 liters = 2.88 kiloliters.');
add(84,'Age problems','Carmen will be 17 in two years. Nicole is 45 now. How old was Nicole when Carmen was born?',['25','28','30','35'],2,'Carmen is 15 now, so Nicole was 45 - 15 = 30 at Carmen\'s birth.');
add(85,'Repeated percent change','A quantity loses 20% each week for two weeks. What percent of its original value remains?',['40%','60%','64%','80%'],2,'0.8 x 0.8 = 0.64, or 64%.');
add(86,'Parity','If w - 1 is odd, which expression must be even?',['w + 1','2w - 2','w - 3','3w + 1'],1,'w must be even, and 2w - 2 is always even.');
add(87,'Least common multiple','Three runners take 2, 3, and 4 minutes per lap. They start together. How many laps does the 2-minute runner complete when they first all return to the start together?',['3','4','6','12'],2,'They meet after LCM(2,3,4) = 12 minutes; 12/2 = 6 laps.');
add(88,'Simplifying expressions','Simplify 4(7 - 3x) - (5 - x).',['23 - 11x','23 - 13x','33 - 11x','33 - 13x'],0,'28 - 12x - 5 + x = 23 - 11x.');
add(89,'Data and probability','In a group, 12 people own no pets, 16 own one, 7 own two, and 5 own at least three. What fraction own at least two?',['1/5','3/10','2/5','3/5'],1,'12 of 40 own at least two, so 12/40 = 3/10.');
add(90,'Percent and capacity','A theater has n people. With 10 more it is 60% full; with 16 more it is 75% full. How many people are there now?',['14','24','30','40'],0,'The six-person difference is 15% of capacity, so capacity is 40. Then n + 10 = 24 and n = 14.');
add(91,'Substitution','Find the value of 5x³ + 3x + 9 + 1/x² when x = 10.',['2,539.01','5,039.01','5,039.1','5,139'],1,'5(10³) + 30 + 9 + 0.01 = 5,039.01.');
add(92,'Area','A square has side length 6 cm. In each of two opposite corners, a triangle is formed by that corner and the midpoints of its two adjoining sides. What is the combined area of the two triangles?',['4.5 cm²','9 cm²','12 cm²','18 cm²'],1,'Each right triangle has legs 3 cm, so each area is 1/2(3)(3) = 4.5 cm².');
add(93,'Fractions','What is 5/8 of $29,600?',['$11,100','$16,500','$18,500','$23,680'],2,'29,600 x 5/8 = 18,500.');
add(94,'Counting','A product comes in 3 sizes. For each size, a buyer chooses 2 distinct colors from 7 available colors. How many size-and-color combinations are possible?',['21','42','63','126'],2,'There are C(7,2) = 21 color pairs for each of 3 sizes, giving 63.');
add(95,'Percent comparison','A shelter has 42 one-cat households and 35 two-cat households. The one-cat count is what percent greater than the two-cat count?',['16 2/3%','20%','25%','120%'],1,'The difference is 7, and 7/35 = 20%.');
add(96,'Volume','A right rectangular prism has a square base with side 3 cm and height 9 cm. What is its volume?',['27 cm³','54 cm³','81 cm³','108 cm³'],2,'Base area is 3 x 3 = 9 cm²; volume is 9 x 9 = 81 cm³.');
add(97,'Rates','One cyclist travels 65 miles in 5 hours; another travels 72 miles in 4 hours. How many miles per hour faster is the second?',['3','5','13','18'],1,'Their rates are 13 and 18 mph, a difference of 5 mph.');
add(98,'Midpoints','On a number line, find the distance between the midpoint of -3 and -1 and the midpoint of 0 and 2.',['1','2','3','4'],2,'The midpoints are -2 and 1; their distance is 3.');
add(99,'Unit conversion','How many cubic millimeters are in 1,000 cubic centimeters?',['10,000','100,000','1,000,000','10,000,000'],2,'1 cm = 10 mm, so 1 cm³ = 1,000 mm³. Multiply by 1,000.');
add(100,'Algebra','A measurement x is 1 unit more than a second measurement y. Which equation gives y in terms of x?',['y = x - 1','y = x + 1','y = 1 - x','y = x/2'],0,'From x = y + 1, subtract 1 to get y = x - 1.');
add(101,'Number line','A point R is three-fifths of the way from -1/4 to 5/8 on a number line. What is its coordinate?',['7/40','9/40','11/40','21/40'],2,'The interval length is 7/8. Add (3/5)(7/8) = 21/40 to -10/40, giving 11/40.');
add(102,'Linear equations','A fare is $18 plus $0.024 per mile. For how many miles will the fare be $30?',['250','400','500','750'],2,'30 - 18 = 0.024m, so m = 12/0.024 = 500.');
add(103,'Probability','Of 50 cars, 12 are red, 10 have backup cameras, and 4 are both red and have cameras. What is the probability a randomly chosen car is neither red nor equipped with a camera?',['3/5','16/25','19/25','4/5'],1,'By inclusion-exclusion, 12 + 10 - 4 = 18 have either property; 32 of 50 have neither, or 16/25.');
add(104,'Percent','If 6% of a number x is 0.18, what is x?',['0.03','0.3','3','30'],2,'0.06x = 0.18, so x = 3.');
add(105,'Coordinate geometry','A triangle has its base on the x-axis from (m, 0) to (n, 0), where n > m. Its third vertex has y-coordinate 4. What is its area?',['m + n','n - m','2(n - m)','4(n - m)'],2,'Base length is n - m and height is 4; area is 1/2 x (n - m) x 4 = 2(n - m).');
add(106,'Probability','Cards show 8 cats, 6 dogs, 5 birds, 4 fish, and 1 horse. What fraction show dogs?',['1/6','1/4','1/3','3/8'],1,'There are 24 cards, and 6/24 = 1/4.');
add(107,'Inequalities','Set y = 1 in 2x - 2 ≤ y ≤ 4x + 10. Which interval contains all solutions for x?',['x < -9/4','-9/4 ≤ x ≤ 3/2','x ≥ 3/2','-3/2 ≤ x ≤ 9/4'],1,'2x - 2 ≤ 1 gives x ≤ 3/2; 1 ≤ 4x + 10 gives x ≥ -9/4.');
add(108,'Proportions','Solve the proportion 14/21 = p/7.',['2/3','3','14/3','14'],2,'p = 7(14/21) = 14/3.');
add(109,'Probability','A bag contains 7 black, 14 green, and 21 red marbles. What is the chance of drawing black?',['1/7','1/6','1/3','1/2'],1,'7 of the 42 marbles are black, and 7/42 = 1/6.');
add(110,'Set overlap','Of 800 students, 720 answered yes to question A and 640 answered yes to question B. At least how many answered yes to both?',['480','540','560','640'],2,'At most 800 are in the union, so the overlap is at least 720 + 640 - 800 = 560.');
add(111,'Inequalities','A value r is at least 3 greater than a value v. Which inequality expresses this?',['r - v ≥ 3','r + v ≥ 3','v - r ≥ 3','r - v ≤ 3'],0,'At least 3 greater means r ≥ v + 3, or r - v ≥ 3.');
add(112,'Unit rates','One sind equals 5.6 ricks and 12.88 dalts. How many dalts equal one rick?',['0.43','2.30','5.6','18.48'],1,'Divide 12.88 dalts by 5.6 ricks to get 2.30 dalts per rick.');
add(113,'Equations','A shelf held 36 books. A student removed x books, then returned 4 of them. Now 18 books are on the shelf. What was x?',['14','18','22','26'],2,'After returning four, the number remaining is 36 - x + 4 = 18; x = 22.');
add(114,'Percent','A class has 50 students and another has 150. If 72% of each class participates, how many students participate altogether?',['108','124','144','150'],2,'Together there are 200 students; 72% of 200 is 144.');
if(questions.length!==114||questions.filter(q=>q.subject==='English').length!==57||questions.filter(q=>q.subject==='Math').length!==57)throw new Error('Full exam must have 57 items per section.');
module.exports={title:'Full-Length SHSAT Practice Exam',version:'full-length-2017-18-b-v1',mode:'fixed',questions,passages,counts:{English:57,Math:57},groups:['editing','library','mountains','debate','ice','marsh','wind','trees','art','math']};
