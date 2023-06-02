import './styles.css';
import rainBg from './assets/rainy-bg.jpg'
import summerBg from "./assets/summer-bg.jpg"
import winterBg from './assets/winter-bg.jpg'
import rainIcon from './assets/icons/cloud-rain.svg'
import summerIcon from './assets/icons/sun.svg'
import winterIcon from './assets/icons/cloud-snow.svg'
import pauseIcon from './assets/icons/pause.svg'
import rainSound from './assets/sounds/rain.mp3'
import summerSound from './assets/sounds/summer.mp3'
import winterSound from './assets/sounds/winter.mp3'

enum Images {
    summer = summerBg,
    rainy = rainBg,
    winter = winterBg
}

enum Icons {
    summer = summerIcon,
    rainy = rainIcon,
    winter = winterIcon,
    pause = pauseIcon
}

enum Sounds {
    summer = summerSound,
    rainy = rainSound,
    winter = winterSound
}

interface WeatherTile {
    name: string,
    image: Images,
    icon: Icons,
    sound: Sounds
}

class AudioValueState {
    audio: HTMLAudioElement | null
    constructor(audio: HTMLAudioElement | null) {
        this.audio = audio;
    }

    setAudio(sound: string) {
        this.audio?.setAttribute("src", sound)
    }

    setAudioValue(value: string) {
        if (this.audio)
            this.audio.volume = Number(value)/100;
        console.log(value, this.audio);
    }
}

const tiles: string[] = ['summer', 'rainy', 'winter'];

document.addEventListener('DOMContentLoaded', () => {
    const body: HTMLElement |  null = document.getElementById("bg");
    const weatherTiles: WeatherTile[] = [];


    const initState = (): void => {
        const audio: HTMLAudioElement | null = document.getElementById("sound") as HTMLAudioElement;
        const state = new AudioValueState(audio)

        tiles.map(value => {
            const tile: WeatherTile = {
                name: value,
                image: Images[value as keyof typeof Images],
                icon: Icons[value as keyof typeof Icons],
                sound: Sounds[value as keyof typeof Sounds]
            }
            weatherTiles.push( tile )
        })
        if(body !== null) {
            body.style.background = `url(${weatherTiles[0].image})`;
        }

        state.setAudio(`${weatherTiles[0].sound}`);
        state.setAudioValue(`${100}`);
        document.getElementById("volume")?.setAttribute

        tiles.forEach((key, index) => {
            document.getElementById(key)?.addEventListener('click', () => {
                if(body !== null)
                    body.style.backgroundImage = `url(${weatherTiles[index].image})`;
                state.setAudio(`${weatherTiles[index].sound}`);
            })
        });


        document.getElementById("volume")?.addEventListener("input", (event: Event) => {

            const target: HTMLInputElement | null = (event?.target as HTMLInputElement);
            state.setAudioValue(`${target?.value}`)

        })
    }

    initState();
})

