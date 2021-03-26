const particles = {
	particles: {
		number: {
			value: 50
		},
		color: {
			value: '#a5d3fc'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000'
			}
		},
		opacity: {
			value: 0.9,
			random: true,
			anim: {
				enable: false,
				speed: 0.9744926547616141,
				opacity_min: 0.15429467033725558,
				sync: false
			}
		},
		size: {
			value: 20
		},
		move: {
			enable: true,
			speed: 1,
			direction: 'top'
		}
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: false,
				mode: 'grab'
			},
			onclick: {
				enable: false,
				mode: 'bubble'
			},
			resize: false
		}
	}
};
export default particles;
