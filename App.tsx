import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as Notification from 'expo-notifications';

Notification.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	async function handleNotification(delay: number) {
		console.log('delay', delay);
		const title = 'Notification Title';
		const description = 'Notification Body';
		if (Platform.OS === 'ios') {
			Notification.requestPermissionsAsync()
				.then((statusObj) => {
					if (statusObj.status !== 'granted') {
						return Notification.requestPermissionsAsync();
					}
					return statusObj;
				})
				.then((statusObj) => {
					if (statusObj.status === 'granted') {
						Notification.scheduleNotificationAsync({
							content: {
								title: title,
								body: description,
								data: { name: 'arun' },
							},
							trigger: { seconds: delay },
						});
					}
				});
		} else {
			await Notification.scheduleNotificationAsync({
				content: {
					title: title,
					body: description,
					data: { name: 'arun' },
				},
				trigger: { seconds: delay },
			});
		}
	}

	return (
		<View style={styles.container}>
			<Button
				title='Show Local Notification'
				onPress={handleNotification.bind(null, 0)}
			/>
			<Button
				title='Show Local Notification with 5sec delay'
				onPress={handleNotification.bind(null, 5)}
			/>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
});
