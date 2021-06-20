import Image from 'next/image'

export default function BackgroundContainer() {
    return (
        <div id={'homepageBackgroundContainer'}>
            <div id={'backgroundPanel_2'} className="backgroundPanel" >
                <Image
                    id={'backgroundImage_2'}
                    src="/homepage.jpg"
                    alt="Homepage image"
                    className="backgroundImage"
                    layout="fill"
                />
            </div>
        </div>
    );
}