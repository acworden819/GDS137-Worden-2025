

function updateColorData() {
    for (let i = 0; i < colorChangingObjects.length; i++) {
        let object = colorChangingObjects[i];

        let platformAlpha = .3
        if (object.isPlatform) {
            platformAlpha = .7
            if (player.colorGroup == object.colorGroup){
                object.y = object.originalY
            }else{
                object.y = 50000
            }
        }

        
        if (globalLower) {
            object.color = object.interpolateColor('#ffffff', player.color, platformAlpha)
            object.lastColor = object.color

        }

        if (globalRaise) {
            object.color = object.interpolateColor(object.lastColor, object.originalColor, colorAlpha)
        }

        if (object.isDoor) {
            if (player.colorGroup != object.colorGroup){
                object.y = object.originalY

            }else{
                object.y = 50000
            }
        }

        if (colorAlpha >= .94 && globalRaise) {
            console.log("end")
            object.color = object.interpolateColor(object.lastColor, object.originalColor, 1)

            player.colorGroup = null;
        }
    }


    for (let i = 0; i < colorSwatchFolder.length; i++) {
        let swatch = colorSwatchFolder[i]

        if (swatch.swatchDown) {
            swatch.swatchFrames++;  //increase frames
        }

        if (player.hitTestObject(swatch) && !swatch.swatchLowering) {
            if (player.color == player.originalColor) {
                swatch.swatchFrames = 0;
                colorAlpha = 0;
                swatch.swatchLowering = true
                globalLower = true;
            }
            player.y = swatch.y - swatchSize.height / 2 - player.height / 2
        }

        if (swatch.swatchLowering) {
            colorAlpha += 0.05;
            swatch.y += 4;

            player.color = player.interpolateColor(player.lastColor, swatch.color, colorAlpha)
            backgroundColor = player.color

            player.colorGroup = swatch.colorGroup

            if (colorAlpha >= 1) {
                player.color = player.interpolateColor(player.lastColor, swatch.color, 1)
                swatch.swatchLowering = false
                globalLower = false;
                player.lastColor = player.color;
                swatch.swatchDown = true;
                colorAlpha = 0;
            }
        }

        if (globalLower && swatch.color) {
            if (!swatch.swatchLowering && !swatch.swatchDown) {
                swatch.color = swatch.interpolateColor('#ffffff', player.color, .3)
                swatch.lastColor = swatch.color
            }
        }

        if (globalRaise) {
            if (!swatch.swatchLowering && !swatch.swatchDown) {
                console.log(colorAlpha)
                swatch.color = swatch.interpolateColor(swatch.lastColor, colorGroups[colorSwatchData[i].colorGroup], colorAlpha)
            }
        }

        if (swatch.swatchFrames >= 60 * swatch.abilityLength) {
            let originalY = colorSwatchData[i].y
            if (swatch.y > originalY) {
                swatch.y -= 4;

                colorAlpha += 0.05;

                //console.log(colorAlpha)
                player.color = player.interpolateColor(swatch.color, player.originalColor, colorAlpha)
                backgroundColor = player.color

                globalRaise = true;

                if (colorAlpha >= 1) {
                    player.color = player.interpolateColor(swatch.color, player.originalColor, 1)
                    swatch.swatchLowering = false
                    globalLower = false;
                    globalRaise = false;
                    player.lastColor = player.color;
                    swatch.swatchDown = false;
                    swatch.swatchFrames = 0
                    colorAlpha = 0;
                }

            }
            else {
                swatch.y = originalY
                colorAlpha = 0;
            }
        }

    }
}