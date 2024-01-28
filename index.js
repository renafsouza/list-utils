
let savedItems = JSON.parse(localStorage.getItem("savedItems")) || {};
const subtract = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading...";

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    let l2 = new Set($("#t2")[0].value.split("\n").filter(Boolean))
    l2 = Array.from(l2).map(i=>i?.toLowerCase())
    const res = l1.filter(i1 => !l2.includes(i1?.toLowerCase()))
    const l3 = $("#t3")[0]
    l3.value=res.join("\n")

    numLines.innerHTML = `${l3.value.split("\n").filter(Boolean).length} results`
}
const filter = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading...";

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    const l2 = $("#t2")[0].value.split("\n").filter(Boolean)

    const res = l1.filter(i1 => l2.find(i2=>i1.match(i2)))
    const l3 = $("#t3")[0]
    l3.value=res.join("\n")

    numLines.innerHTML = `${l3.value.split("\n").filter(Boolean).length} results`
}
const sqlIn = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading..."

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    const l3 = $("#t3")[0]
    l3.value=`(${l1.map(a=>`'${a}'`).join(",")})`

    numLines.innerHTML = `${l3.value.split(",").filter(Boolean).length} results`
}
const toArray = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading..."

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    const l3 = $("#t3")[0]
    l3.value=`[${l1.map(a=>`'${a}'`).join(",")}]`
    
    numLines.innerHTML = `${l3.value.split(",").filter(Boolean).length} results`
}
const toKibanaQuery = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading..."

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    const l3 = $("#t3")[0]
    l3.value=`(${l1.map(a=>`"${a}"`).join(" OR ")})`
    
    numLines.innerHTML = `${l3.value.split(" OR ").filter(Boolean).length} results`
}
const unique = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading..."

    const l1 = $("#t1")[0].value.split("\n").filter(Boolean)
    const l3 = $("#t3")[0]
    l3.value=Array.from(new Set(l1)).join("\n")
    
    numLines.innerHTML = `${l3.value.split("\n").filter(Boolean).length} results`
}
const save = async (e)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "saved"
    const l3 = $("#t3")[0]
    const l2 = $("#t2")[0]
    savedItems[l2.value] = l3.value;
    localStorage.setItem("savedItems",JSON.stringify(savedItems));
    updateSavedItems()
}
const updateLines = ()=>{
    const numLines = $(".numLines");
    const l1 = $("#t1")[0]
    numLines[0].innerHTML = `${l1.value.split("\n").filter(Boolean).length} lines`
    const l2 = $("#t2")[0]
    numLines[1].innerHTML = `${l2.value.split("\n").filter(Boolean).length} lines`
}
const cleanText = async (e)=>{
    const l1 = $("#t1")[0]
    const l2 = $("#t2")[0]
    const l3 = $("#t3")[0]
    l1.value = '';
    l2.value = '';
    l3.value = '';
    const numLines = $(".numLines");
    numLines[2].innerHTML = '0 lines';
    updateLines();
}
const updateSavedItems = ()=>{
    const l1 = $("#t1")[0]
    const l2 = $("#t2")[0]
    const l3 = $("#t3")[0]
    const savedItemsDiv = $("#savedItems")[0]
    savedItemsDiv.innerHTML = "";
    Object.entries(savedItems).forEach(([key,value])=>{
        const div = document.createElement("div")
        const button = document.createElement("button")
        const button2 = document.createElement("button")
        const text = document.createTextNode(key)
        const text2 = document.createTextNode("r")
        button.appendChild(text)
        button2.appendChild(text2)
        button2.onclick=()=>{
            l2.value = key
            l3.value = value
            delete savedItems[key]
            localStorage.setItem("savedItems",JSON.stringify(savedItems));
            updateSavedItems()
            updateLines()
        }
        div.appendChild(button2)
        div.appendChild(button)
        button.onclick = ()=>{
            l1.value = value
            updateLines()
        }
        savedItemsDiv.appendChild(div)
    })
}

const ta1 = $("#t1")[0];
const ta2 = $("#t2")[0];
const ta3 = $("#t3")[0];
const numLines = $(".numLines");
ta1.addEventListener('input', function(e) {
    numLines[0].innerHTML = `${ta1.value.split("\n").filter(Boolean).length} lines`
}, false);
ta2.addEventListener('input', function(e) {
    numLines[1].innerHTML = `${ta2.value.split("\n").filter(Boolean).length} lines`
}, false);
ta3.addEventListener('input', function(e) {
    numLines[2].innerHTML = `${ta3.value.split("\n").filter(Boolean).length} lines`
}, false);