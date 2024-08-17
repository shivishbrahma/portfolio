import React from 'react';

import chromeIcon from '@/images/icons/chrome.svg';
import edgeIcon from '@/images/icons/edge.svg';
import safariIcon from '@/images/icons/safari.svg';
import ieIcon from '@/images/icons/ie.svg';
import firefoxIcon from '@/images/icons/firefox.png';
import operaIcon from '@/images/icons/opera.svg';
import macIcon from '@/images/icons/mac.svg';
import androidIcon from '@/images/icons/android.png';
import iosIcon from '@/images/icons/ios.svg';
import windowsIcon from '@/images/icons/windows.png';
import linuxIcon from '@/images/icons/linux.png';

import {
    getAndroidVersion,
	getBrowser,
	getDeviceInfo,
	getIosVersion,
	getLanguage,
	getOs,
	getStatusInfo,
} from './utils';
import Button from '@/atoms/Button/Button';

import './Netstats.scss';

export default function Netstats() {
	const [location, setLocation] = React.useState(null);

	function locateMe() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;
				// getAddress(latitude, longitude).then((address) => {
				const newLocation = { latitude, longitude };
				setLocation(newLocation);
				// });
			});
		} else {
			setLocation({ error: 'Geolocation is not supported by this browser.' });
		}
	}

	React.useEffect(() => {});
	return (
		<section className="Netstats">
			<h1 className="Netstats__title">Netstats</h1>

			<h3 className="Netstats__subtitle">Browser Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Name:</span>
					{getBrowser().isChrome && <img src={chromeIcon} alt="Chrome" className="Netstats__icon" />}
					{getBrowser().isFirefox && <img src={firefoxIcon} alt="Firefox" className="Netstats__icon" />}
					{getBrowser().isEdge && <img src={edgeIcon} alt="Edge" className="Netstats__icon" />}
					{getBrowser().isOpera && <img src={operaIcon} alt="Opera" className="Netstats__icon" />}
					{getBrowser().isSafari && <img src={safariIcon} alt="Safari" className="Netstats__icon" />}
					{getBrowser().isIE && <img src={ieIcon} alt="IE" className="Netstats__icon" />}
					{getBrowser().name}
				</li>
				<li>
					<span className="Netstats__fieldname">Version:</span>
					{getBrowser().version}
				</li>
				<li>
					<span className="Netstats__fieldname">Major Version:</span>
					{getBrowser().majorVersion}
				</li>
				<li>
					<span className="Netstats__fieldname">Language:</span>
					{getLanguage()}
				</li>
				<li>
					<span className="Netstats__fieldname">OS:</span>
					{getOs().isLinux && <img src={linuxIcon} alt="Linux" className="Netstats__icon" />}
					{getOs().isWindows && <img src={windowsIcon} alt="Windows" className="Netstats__icon" />}
					{getOs().isMac && <img src={macIcon} alt="Mac" className="Netstats__icon" />}
					{getOs().isAndroid && <img src={androidIcon} alt="Android" className="Netstats__icon" />}
					{getOs().isIOS && <img src={iosIcon} alt="IOS" className="Netstats__icon" />}
					{getOs().OSName} ({getOs().platform})
				</li>
				{getOs().isAndroid && (
					<li>
						<span className="Netstats__fieldname">Android Version:</span>
						{getAndroidVersion()}
					</li>
				)}
				{getOs().isIOS && (
					<li>
						{' '}
						<span className="Netstats__fieldname">iOS Version:</span>
						{getIosVersion()}
					</li>
				)}
			</ul>

			<h3 className="Netstats__subtitle">Status Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Online:</span>
					{getStatusInfo().online ? 'Online' : 'Offline'}
				</li>
				<li>
					<span className="Netstats__fieldname">Cookies Enabled:</span>
					{getStatusInfo().cookie_enabled ? 'Yes' : 'No'}
				</li>
				<li>
					<span className="Netstats__fieldname">Java Enabled:</span>
					{getStatusInfo().java_enabled ? 'Yes' : 'No'}
				</li>
			</ul>

			<h3 className="Netstats__subtitle">Device Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Dimensions:</span>
					{getDeviceInfo().dimensions}
				</li>
				<li>
					<span className="Netstats__fieldname">Screen:</span>
					{getDeviceInfo().screen}
				</li>
				<li>
					<span className="Netstats__fieldname">Resolution:</span>
					{getDeviceInfo().resolution}
				</li>
			</ul>

			{location && (
				<>
					<h3 className="Netstats__subtitle">Location Info:</h3>
					{!location.error ? (
						<ul className="Netstats__list">
							<li>
								<span className="Netstats__fieldname">Latitude:</span>
								{location.latitude}
							</li>
							<li>
								<span className="Netstats__fieldname">Longitude:</span>
								{location.longitude}
							</li>
						</ul>
					) : (
						<>
							<p>{location.error}</p>
						</>
					)}
				</>
			)}

			<Button className="Netstats__Button" type="button" theme="tertiary" onClick={() => locateMe()}>
				Locate me
			</Button>
		</section>
	);
}
