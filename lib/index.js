import { Scene, Triangle, WebGLRenderer, Shader, Quadrilateral } from './lib/threeD.js';
import { vertexShaderSrc } from './shaders/vertex.js';
import { fragmentShaderSrc } from './shaders/fragment.js';



const scene1 = new Scene();


// center coordinate and length, l
let cx = 0;
let cy = 0;
let l = 1.0;

// current mode
let mode = 0;

// color schemes
let orange = [1, 0.67, 0.0, 1];
let blue = [0, 0, 1, 1];
let yellow = [1, 1, 0, 1];
let green = [0, 1, 0, 1];
let cyan = [0, 1, 1, 1];
let red = [1, 0, 0, 1];
let purple = [1, 0, 1, 1];

// orangeTriangle
let orangeTriangle = new Triangle(cx - l, cy + l, cx + l, cy + l, cx, cy, orange);

// blue Triangle
let blueTriangle = new Triangle(cx + l, cy + l , cx + l, cy - l, cx , cy, blue);

// yellowTriangle
let yellowTriangle = new Triangle(cx + l, cy - l, cx, cy - l , cx + l / 2, cy - l / 2, yellow);

// green triangle
let greenTriangle = new Triangle(cx - l , cy - l, cx , cy-l, cx-l, cy, green);

// cyan triangle
let cyanTriangle = new Triangle(cx, cy, cx - l / 2, cy + l / 2, cx - l / 2, cy - l / 2, cyan);

// red quad
let redSquare = new Quadrilateral(cx, cy, cx+l/2, cy-l/2, cx, cy-l, cx - l / 2, cy - l / 2, red);

// purple quad
let purpleQuad = new Quadrilateral(cx - l, cy + l, cx - l / 2, cy + l / 2, cx - l / 2 cy - l / 2, cx - l, cy, purple);



scene1.add(redSquare);
scene1.add(purpleQuad);
scene1.add(orangeTriangle);
scene1.add(blueTriangle);
scene1.add(yellowTriangle);
scene1.add(greenTriangle);
scene1.add(cyanTriangle);


const renderer1 = new WebGLRenderer();
renderer1.setSize(600, 600);
document.body.appendChild(renderer1.domElement);


const shader1 = new Shader(renderer1.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader1.use();

renderer1.setAnimationLoop(animation1);

function animation1() {
    renderer1.clear(0.9, 0.9, 0.9, 1);
    renderer1.render(scene1, shader1);
}





const scene2 = new Scene();

function buildRandomWidgets(scene2) {

    // using math random function to randomly place all the widgets
    for (let i = 0; i < 7; i++) {
        cx[i] = Math.random();
        cy[i] = Math.random();
    }
    let l = 0.8;
    cx[0] = cx[0]%0.2 - 0.1;
    cy[0] = cy[0]-1;

    cx[1] = cx[1] -1;
    cy[1] = cy[1]%0.2 - 1;

    cx[2] = cx[2] - 0.9;

    cx[3] -= 0.1;
    cy[3] -= 0.1;

    cx[4] -= 0.1;
    cy[4] -= 0.5;

    cx[5] -= 0.5;
    cy[5] -= 0.1;

    cy[6] = cy[6]%0.6 - 0.5;
    const quad1 = new Quadrilateral(cx[5], cy[5], cx[5] + l / 2, cy[5] - l / 2, cx[5], cy[5] - l, cx[5] - l / 2, cy[5] - l / 2, red);
    const quad2 = new Quadrilateral(cx[6] - l, cy[6] + l, cx[6] - l / 2, cy[6] + l / 2, cx[6] - l / 2, cy[6] - l / 2, cx[6] - l, cy[6], purple);
    const t1 = new Triangle(cx[0] - l, cy[0] + l, cx[0] + l, cy[0] + l, cx[0], cy[0], orange);
    const t2 = new Triangle(cx[1] + l, cy[1] + l, cx[0] + l, cy[0] - l, cx[0], cy[0], blue);
    const t3 = new Triangle(cx[2] + l, cy[2] - l, cx[2], cy[2] - l, cx[2] + l / 2, cy[2] - l / 2, yellow);
    const t4 = new Triangle(cx[3] - l, cy[3] - l, cx[3], cy[3] - l, cx[3] - l, cy[3], green);
    const t5 = new Triangle(cx[4], cy[4], cx[4] - l / 2, cy[4] + l / 2, cx[4] - l / 2, cy[4] - l / 2, cyan);


    scene2.add(t1);
    scene2.add(t2);
    scene2.add(t3);
    scene2.add(t4);
    scene2.add(t5);
    scene2.add(quad1);
    scene2.add(quad2);
}

buildRandomWidgets(scene2);



const renderer2 = new WebGLRenderer();
renderer2.setSize(600, 600);
document.body.appendChild(renderer2.domElement);


const shader2 = new Shader(renderer2.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader2.use();



renderer2.setAnimationLoop(animation2);



let Rendered_Fig_Centroid = [0.0, 0.0, 0.0]


window.addEventListener("keydown", function (event) {
    let key = event.key;
    console.log(key);
    if (key === "ArrowLeft") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('t', -0.1, 0, 0);
            currentPrimitive.modifyCentroid();
        }
        else if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('t', -0.1, 0, 0);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }
    
    else if (key === "ArrowRight") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('t', 0.1, 0, 0);
            currentPrimitive.modifyCentroid();
        }
        else if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('t', 0.1, 0, 0);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }
    else if (key === "ArrowUp") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('t', 0, 0.1, 0);
            currentPrimitive.modifyCentroid();
        }
        else if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('t', 0, 0.1, 0);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }
    else if (key === "ArrowDown") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('t', 0, -0.1, 0);
            currentPrimitive.modifyCentroid();
        }
        else if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('t', 0, -0.1, 0);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }

    else if (key === "9") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('r', 10 * Math.PI / 180, 0, 0, currentPrimitive.Centroid);
            currentPrimitive.modifyCentroid();
        }

        if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('r', 10 * Math.PI / 180, 0, 0, Rendered_Fig_Centroid);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }
    else if (key === "0") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('r', -10 * Math.PI / 180, 0, 0, currentPrimitive.Centroid);
            currentPrimitive.modifyCentroid();
        }

        if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('r', -10 * Math.PI / 180, 0, 0, Rendered_Fig_Centroid);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }

    else if (key === "-") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('s', 0.9, 0.9, 0.9, currentPrimitive.Centroid);
            currentPrimitive.modifyCentroid();
        }

        if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('s', 0.9, 0.9, 0.9, Rendered_Fig_Centroid);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }

    else if (key === "=") {
        if (mode === 1) {
            currentPrimitive.transform.modifyTransformationMatrix('s', 1.1, 1.1, 1.1, currentPrimitive.Centroid);
            currentPrimitive.modifyCentroid();
        }

        if (mode === 2) {
            for (let i = 0; i < scene2.primitives.length; i++) {
                scene2.primitives[i].transform.modifyTransformationMatrix('s', 1.1, 1.1, 1.1, Rendered_Fig_Centroid);
                scene2.primitives[i].modifyCentroid();
            }
        }
    }
    else if (key === 'm') {
        console.log(mode);
        if (mode === 3) {
            scene2.clear();
        }

        if (mode === 2) {
            let lenPrim = scene2.primitives.length;
            for (let i = 0; i < lenPrim; i++)
                scene2.primitives[i].modify_coordinates();
            
            let len = this.coordinates.length;
            let xm1 = this.coordinates[0], xm2 = this.coordinates[0];
            let ym1 = this.coordinates[1], ym2 = this.coordinates[1];

            for (let i = 3; i < len; i += 3) {
                xm1 = Math.min(xm1, this.coordinates[i]);
                xm2 = Math.max(xm2, this.coordinates[i]);
            }
            for (let i = 4; i < len; i += 3) {
                ym1 = Math.min(ym1, this.coordinates[i]);
                ym2 = Math.max(ym2, this.coordinates[i]);
            }
            Rendered_Fig_Centroid[1] = (ym1 + ym2)/2;
            Rendered_Fig_Centroid[0] = (xm1 + xm2)/2;
        }

        if (mode === 0) {
            buildRandomWidgets(scene2);
        }
    }
    
}
);

let currentPrimitive = scene2.primitives[0];

window.addEventListener("click", function (event) {
    if (mode === 1) {
        let z = 0.0, x = event.clientX, y = event.clientY;
        x = renderer2.mouseToClipCoord(x, y)[0];
        y = renderer2.mouseToClipCoord(x, y)[1];
        let pt = [x, y, z];
        let d = dist(pt, c);

        let nearestPrimitive = 0;
    //     ,  i = 0; i < scene2.primitives.length; i++) , c = scene2.primitives[i].currCentroid;
    //    if (d < nearestCentroidDist)           nearestCentroidDist = d;
    //             nearestPrimitive   if (d < nearestCentroidDist) = i;
    //         }
    //     }
        currentPrimitive = scene2.primitives[nearestPrimitive];
    }
}
);


function animation2() {
    renderer2.clear(0.8, 0.8, 0.8, 1);
    renderer2.render(scene2, shader2);
}