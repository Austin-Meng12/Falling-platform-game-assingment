
//draw line
function line(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1) //endpoint 1
    ctx.lineTo(x2,y2) //enpoint 2
    ctx.stroke();
}

//draw rectangle
function rect(x,y,w,h,mode){
    if (mode ==="fill") {
        ctx.fillRect(x,y,w,h);
    } else if (mode ==='stroke') {
        ctx.strokeRect(x,y,w,h);
    
    }
    }

// draw circle with center(x,y) and radius r
function circle(x,y,r,mode ) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI)
    if (mode === "fill") {
        ctx.fill();

    }else if(mode === "stroke")
        ctx.stroke()
}

function triangle(x1,y1,x2,y2,x3,y3,mode) {
    ctx.beginPath();
    ctx.moveTo(x1,y1) //vertex 1
    ctx.lineTo(x2,y2) //vertex 2
    ctx.lineTo(x3,y3)  //vertex 3
    if (mode === "fill") {
        ctx.fill()

    } else if (mode === "stroke") {
        ctx.closePath();
        ctx.stroke();
    }
    ctx.stroke();
}

function font(fontSetting) {
    ctx.font =  fontSetting;
}
function text(message,x,y,mode) {
    if (mode ==="fill") {
            ctx.fillText(message,x,y);
    } else if (mode ==="stroke") {
        ctx.strokeText(message, x, y)
    }
}
function stroke(color) {
    ctx.strokeStyle = color;

}
function fill(color) {
    ctx.fillStyle = color ; 

}
function linewidth(width) {
    ctx.linewidth = width

}
function ellipse(x,y,xRadius, yRadius, rotation, mode,) {
    ctx.ellipse(x, y, xRadius, yRadius, rotation, 0, 2*Math.PI)
    if (mode ==="fill") {
        ctx.fill();
    } else if (mode ==="stroke") {
        ctx.stroke();
    }
}

  // Determine the distance between two points
  function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }
//testing to see wheter or not a point is in a rectangle
function ptInRectangle(x, y, aRect) {
    return (x > aRect.x && x < aRect.x + aRect.w && y > aRect.y && y < aRect.y + aRect.h);
  }



  function mousemoveHandlerLib(e) {
    // Get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect();
  
    // Calc mouse coordinates using mouse event and canvas location info
    mouseX = Math.round(e.clientX - cnvRect.left);
    mouseY = Math.round(e.clientY - cnvRect.top);
  }
 
// Test if two rectangle objects intersect
function rectCollide(rect1, rect2) {
    let le1 = rect1.x;
    let re1 = rect1.x + rect1.w;
    let te1 = rect1.y;
    let be1 = rect1.y + rect1.h;
    let le2 = rect2.x;
    let re2 = rect2.x + rect2.w;
    let te2 = rect2.y;
    let be2 = rect2.y + rect2.h;
    return le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2;
  }