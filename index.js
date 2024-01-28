const getOptions = ()=>{
    console.log($('input[name=arrayDataWrap]'))
    return {
        arrayDataWrap: Array.from($('input[name=arrayDataWrap]')).find(el=>el.checked).value,
        arrayWrap: Array.from($('input[name=arrayWrap]')).find(el=>el.checked).value,
        arrayJoin: Array.from($('input[name=arrayJoin]')).find(el=>el.checked).value,
    }
}

const setOutput = (array)=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading...";
    const l3 = $("#t3")[0]

    let output = [...array];
    const options = getOptions()
    switch(options.arrayDataWrap){
        case "doubleQuote":
            output = output.map(el=>`"${el}"`)
            break;
        case "singleQuote":
            output = output.map(el=>`'${el}'`)
    }
    switch(options.arrayJoin){
        case "comma":
            output = output.join(",\n")
            break;
        case "space":
            output = output.join(" ")
            break;
        case "newLine":
            output = output.join("\n")
            break;
    }
    switch(options.arrayWrap){
        case "parenthesis":
            output = `(${output})`
            break;
        case "brackets":
            output = `[${output}]`
            break;
        case "none":
            output = `${output}`
            break;
    }
    l3.value= output
    numLines.innerHTML = `${l3.value.split("\n").filter(Boolean).length} lines`
}
const setOutputLoading = ()=>{
    const numLines = $(".numLines")[2];
    numLines.innerHTML = "loading...";

}

const getA = ()=>{
    return $("#t1")[0].value.split("\n").filter(line=>line!=="")
}
const getB = ()=>{
    return $("#t2")[0].value.split("\n").filter(line=>line!=="")
}

const subtract = async (e)=>{
    setOutputLoading()
    const A = getA()
    let B = new Set(getB())
    B = Array.from(B).map(i=>i?.toLowerCase())
    const res = A.filter(i1 => !B.includes(i1?.toLowerCase()))
    setOutput(res)
}
const filter = async (e)=>{
    setOutputLoading()
    const A = getA()
    const B = getB()
    const res = A.filter(i1 => B.find(i2=>i1.match(i2)))
    setOutput(res)

}
const unique = async (e)=>{
    setOutputLoading()
    const A = getA().filter(Boolean)
    const res = Array.from(new Set(A))
    setOutput(res)
}

const updateLines = ()=>{
    const numLines = $(".numLines");
    const A = $("#t1")[0]
    numLines[0].innerHTML = `${A.value.split("\n").filter(Boolean).length} lines`
    const B = $("#t2")[0]
    numLines[1].innerHTML = `${B.value.split("\n").filter(Boolean).length} lines`
}

const cleanText = async (e)=>{
    const A = $("#t1")[0]
    const B = $("#t2")[0]
    const l3 = $("#t3")[0]
    A.value = '';
    B.value = '';
    l3.value = '';
    const numLines = $(".numLines");
    numLines[2].innerHTML = '0 lines';
    updateLines();
}

$(window).ready(()=>{
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
})