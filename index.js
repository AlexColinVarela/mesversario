AFRAME.registerComponent('scene-manager', {
    init: function () {
      var scenes = [] // document.querySelectorAll('[id^="scene-"]')
      var idx = 0
      while(true)
      {
        var s = document.getElementById("scene-" + idx)
        if(s)
        {
            scenes.push(s)
        }
        else
        {
            break
        }
        idx++
      }

      var numScenes = scenes.length
      var currentScene = 1

      const hideAll = ()=>{
        for(var cnt = 0; cnt < numScenes; cnt++)
        {
            var el = scenes[cnt].querySelectorAll("*")
            for(var cnt2 = 0; cnt2 < el.length; cnt2++)
            {
                if(el[cnt2].object3D)
                {
                    el[cnt2].object3D.visible = false
                }
            }
        }
      }

      const unHide = (i) => {
        var el = scenes[i].querySelectorAll("*")
        for(var cnt2 = 0; cnt2 < el.length; cnt2++)
        {
            if(el[cnt2].object3D)
            {
                el[cnt2].object3D.visible = true
            }
        }
      }
      
      hideAll()

      var botonIzq = document.getElementById("butonIzq")
      var botonDer = document.getElementById("butonDer")
      botonIzq.object3D.traverse((child) => {
        if (child.type === 'Mesh') {
            const material = child.material
            material.transparent = true
            child.material = material
        }
    })
    botonDer.object3D.traverse((child) => {
        if (child.type === 'Mesh') {
            const material = child.material
            material.transparent = true
            child.material = material
        }
    })
      const cambiarScene = (i) => {
        hideAll()
        currentScene += i
        botonIzq.object3D.visible = (currentScene > 0)
        botonIzq.setAttribute('class', (currentScene > 0)? 'cantap' : '')
        botonDer.object3D.visible = (currentScene < numScenes-1)
        botonDer.setAttribute('class', (currentScene < numScenes-1)? 'cantap' : '')
        unHide(currentScene)
        console.log("going to " + currentScene)
      }
      botonIzq.addEventListener('click', ()=>{
        cambiarScene(-1)
      })
      botonDer.addEventListener('click', ()=>{
        cambiarScene(1)
      })
      cambiarScene(-1)
    }
  });