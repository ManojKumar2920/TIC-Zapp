import * as three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
const canvas = document.querySelector(".webgl")

const scene = new three.Scene()
const sizes = {
    width: window.innerWidth,
    heigth: window.innerHeight
}

const camera = new three.PerspectiveCamera(75, sizes.width / sizes.heigth)
scene.add(camera)
camera.position.z = 5


window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.heigth = window.innerHeight

    camera.aspect = sizes.width / sizes.heigth
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.heigth)
})



const box = new three.Mesh(new three.TorusGeometry(), new three.MeshBasicMaterial({
    color: "#ff0000"
}))
// scene.add(box)

const exrloader = new EXRLoader()
exrloader.load("city.exr", (texture) => {
    texture.mapping = three.EquirectangularReflectionMapping;
    
    scene.environment = texture
})


const modeloader = new GLTFLoader()
let model
let modelgroup = new three.Group()
modeloader.load("./Zapp-red.glb", (gltf) => {
    model = gltf.scene
    model.scale.set(30, 30, 30)
    // model.rotation.z = 1
    // model.position.y = -1
    // model.position.x = -1
    model.children[0].material.roughness = 1
    // console.log(model);
    // model.material.roughness = 1
    modelgroup.add(model)
})
modelgroup.rotation.z = -.8
scene.add(modelgroup)


const light = new three.DirectionalLight("white", 2)
scene.add(light)

const light1 = new three.AmbientLight("white", 2)
scene.add(light1)


let toggle = true
const greentexture = new three.TextureLoader().load("green.jpg")
const redtexture = new three.TextureLoader().load("red.png")
greentexture.flipY = false
greentexture.colorSpace = three.SRGBColorSpace

redtexture.flipY = false
redtexture.colorSpace = three.SRGBColorSpace

setInterval((e) => {

    if (toggle) {

        model.traverse((e) => {
            if (e.name === "Bottle") {
                e.material.map = greentexture
            }

        })

    }
    else {
        model.traverse((e) => {
            if (e.name === "Bottle") {
                e.material.map = redtexture
            }

        })

    }
    toggle = !toggle


}, 2000);






const renderer = new three.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
})
renderer.setPixelRatio(Math.min(2, 3))
// window.devicePixelRatio = Math.min(2, 3)
renderer.setSize(sizes.width, sizes.heigth)
renderer.outputColorSpace = three.SRGBColorSpace

let clock = new three.Clock()


function tick() {
    const deltatime = clock.getDelta()
    if (model) {
        model.rotation.y += deltatime
    }



    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
