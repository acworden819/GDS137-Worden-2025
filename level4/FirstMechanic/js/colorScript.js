

function updateColorData() {
    for (let i = 0; i < colorSwatchFolder.length; i++) {
        let swatch = colorSwatchFolder[i]

        if (player.hitTestObject(swatch) && !swatch.swatchLowering) {
            if (player.color == player.originalColor) {
                swatch.swatchFrames = 0;
                colorAlpha = 0;
                swatch.swatchLowering = true
                globalLower = true;
            }
            player.y = swatch.y - swatchSize.height * 2
        }

        if (swatch.swatchLowering) {
            colorAlpha += 0.05;
            swatch.y += 4;

            player.color = player.interpolateColor(player.lastColor, swatch.color, colorAlpha)
            backgroundColor = player.color

            if (colorAlpha >= 1) {
                swatch.swatchLowering = false
                globalLower = false;
                player.lastColor = player.color;
                swatch.swatchDown = true;
                colorAlpha = 0;
                swatch.lastColor = swatch.color
            }
        }
        if (swatch.swatchDown) {
            swatch.swatchFrames++;
        }

        if (globalLower && swatch.color) { //also check for default color
            if (!swatch.swatchLowering && !swatch.swatchDown) {
                swatch.color = swatch.interpolateColor('#ffffff', player.color, .3)
            }
        }

        if (globalRaise) {
            if (!swatch.swatchLowering && !swatch.swatchDown) {
                swatch.color = swatch.interpolateColor(swatch.lastColor, colorSwatchData[i].color, colorAlpha)
            }
        }

        if (swatch.swatchFrames >= 60 * swatch.abilityLength) {
            let originalY = colorSwatchData[i].y
            if (swatch.y > originalY) {
                swatch.y -= 4;

                colorAlpha += 0.05;

                console.log(colorAlpha)
                player.color = player.interpolateColor(swatch.color, player.originalColor, colorAlpha)
                backgroundColor = player.color

                globalRaise = true;

                if (colorAlpha >= 1) {
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