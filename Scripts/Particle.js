var particle = {
	position: null,
	velocity: null,
	angle: null,
    friction: 1,
	tankfriction: .929,
	mass: 1,
	radius: 0,
	bounce: -1,

	create: function(x, y, speed, direction) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		return obj;
	},

	accelerate: function(accel) {
		this.velocity.addTo(accel);
	},

	update: function() {
		this.position.addTo(this.velocity);
        this.velocity.multiplyBy(this.friction);
        this.velocity.multiplyBy(this.tankfriction);
	}
};