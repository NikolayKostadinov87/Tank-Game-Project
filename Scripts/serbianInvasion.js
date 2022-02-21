function serbianScenario() {
    //---------------INITIALIZING CANVAS SETTINGS-------------------
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var frames = 0;
    //---------------INITIALIZING TANK AND ALPHA SNIPER ENEMIES PROPERTIES-------------------
    var tank = particle.create(width / 2, height / 2, 0, 0);
    var FirstAlphaSniperEnemy = particle.create(150 , 150 , 0 , 0);
    var SecondAlphaSniperEnemy = particle.create(250 , 250 , 0 , 0);
    var ThirdAlphaSniperEnemy = particle.create(150 , 350 , 0 , 0);
    var FourthAlphaSniperEnemy = particle.create(250 , 450 , 0 , 0);
    var FifthAlphaSniperEnemy = particle.create(150 , 650 , 0 , 0);
    //------------------------------TANK PROPERTIES------------------------------
    var thrust = vector.create(0, 0);
    var angleOfTankRotation = 0;
    var turningLeft = false,
        turningRight = false,
        thrusting = false; 
    var MouseX_TankPositionX , MouseY_TankPositionY , angleOfTankGun = 0;
    //ARRAYS OF THE TANK'S BULLETS , SUICIDE ENEMIES , BULLETS OF ENEMIES
    let bullets = [] , enemyBullets = [] , enemies = [] , SuicideEnemyArr = [];
    //-----GAME OVER SOUND-----
    var gameOverSound = new Audio();
    gameOverSound.src = 'GameOver/126296766.mp3';
    //---------------INITIALIZING SUICIDE ENEMY ANGLE-------------------
    var SuicideEnemyAngle;
    //---------------INITIALIZING ALPHA SNIPER ENEMY SETTINGS-------------------
    var isDeadFirstEnemy = false ,isDeadSecondEnemy = false ,isDeadThirdEnemy = false ,
    isDeadFourthEnemy = false ,isDeadFifthEnemy = false ;
    var FirstAlphaSniperEnemy_DX , FirstAlphaSniperEnemy_DY ,
    SecondAlphaSniperEnemy_DX , SecondAlphaSniperEnemy_DY, 
    ThirdAlphaSniperEnemy_DX , ThirdAlphaSniperEnemy_DY, 
    FourthAlphaSniperEnemy_DX , FourthAlphaSniperEnemy_DY,
    FifthAlphaSniperEnemy_DX , FifthAlphaSniperEnemy_DY,
    FirstAlphaSniperEnemyAngle ,
    SecondAlphaSniperEnemyAngle , ThirdAlphaSniperEnemyAngle,
    FourthAlphaSniperEnemyAngle , FifthAlphaSniperEnemyAngle; 
    //Initializing FIRST ENEMY PROPERTIES
    FirstAlphaSniperEnemy_DX = tank.position.getX() - FirstAlphaSniperEnemy.position.getX();
    FirstAlphaSniperEnemy_DY = tank.position.getY() - FirstAlphaSniperEnemy.position.getY();
    FirstAlphaSniperEnemyAngle = Math.atan2(FirstAlphaSniperEnemy_DY , FirstAlphaSniperEnemy_DX);
    //Initializing SECOND ENEMY PROPERTIES
    SecondAlphaSniperEnemy_DX = tank.position.getX() - SecondAlphaSniperEnemy.position.getX();
    SecondAlphaSniperEnemy_DY = tank.position.getY() - SecondAlphaSniperEnemy.position.getY();
    SecondAlphaSniperEnemyAngle = Math.atan2(SecondAlphaSniperEnemy_DY , SecondAlphaSniperEnemy_DX);
    //Initializing THIRD ENEMY PROPERTIES
    ThirdAlphaSniperEnemy_DX = tank.position.getX() - ThirdAlphaSniperEnemy.position.getX();
    ThirdAlphaSniperEnemy_DY = tank.position.getY() - ThirdAlphaSniperEnemy.position.getY();
    ThirdAlphaSniperEnemyAngle = Math.atan2(ThirdAlphaSniperEnemy_DY , ThirdAlphaSniperEnemy_DX);
    //Initializing FOURTH ENEMY PROPERTIES
    FourthAlphaSniperEnemy_DX = tank.position.getX() - FourthAlphaSniperEnemy.position.getX();
    FourthAlphaSniperEnemy_DY = tank.position.getY() - FourthAlphaSniperEnemy.position.getY();
    FourthAlphaSniperEnemyAngle = Math.atan2(FourthAlphaSniperEnemy_DY , FourthAlphaSniperEnemy_DX);
    //Initializing FIFTH ENEMY PROPERTIES
    FifthAlphaSniperEnemy_DX = tank.position.getX() - FifthAlphaSniperEnemy.position.getX();
    FifthAlphaSniperEnemy_DY = tank.position.getY() - FifthAlphaSniperEnemy.position.getY();
    FifthAlphaSniperEnemyAngle = Math.atan2(FifthAlphaSniperEnemy_DY , FifthAlphaSniperEnemy_DX);
    var RADIUS_ALPHA_SNIPER_ENEMY = 15;
    //BACKGROUND
    var background = new Image();
    background.src = "Background/firstCampaignBackgroundCapital.png"
    var serbian_flag = new Image();
    serbian_flag.src = "EnemiesSkins/serbian_flag.png";
    //AUDIO
    var FirstEnemyTankShot = new Audio();
    var SecondEnemyTankShot = new Audio();
    var ThirdEnemyTankShot = new Audio();
    var FourthEnemyTankShot = new Audio();
    var FifthEnemyTankShot = new Audio();
    FirstEnemyTankShot.src = "GameOver/EnemyTankShot.mp3";
    SecondEnemyTankShot.src = "GameOver/EnemyTankShot.mp3";
    ThirdEnemyTankShot.src = "GameOver/EnemyTankShot.mp3";
    FourthEnemyTankShot.src = "GameOver/EnemyTankShot.mp3";
    FifthEnemyTankShot.src = "GameOver/EnemyTankShot.mp3";
    //COUNTERS OF DAMAGE ON EMEMIES
    var counterFirstEnemyDamage = 0,
        counterSecondEnemyDamage = 0,
        counterThirdEnemyDamage = 0,
        counterFourthEnemyDamage = 0,
        counterFifthEnemyDamage = 0;
    //COUNTER OF ENEMIES HITTING THE TANK
    var killedEnemiesCounter = 0;

    update();

    //-----MOUSE MOOVE EVENT
    document.body.addEventListener("mousemove", function(event){
        MouseX_TankPositionX = event.clientX - tank.position.getX();
        MouseY_TankPositionY = event.clientY - tank.position.getY();
        angleOfTankGun = Math.atan2(MouseY_TankPositionY , MouseX_TankPositionX);
    });

    //-----MOUSE CLICKED LEFT BUTTON
    document.body.addEventListener("mouseup" , function(event){
            bullets.push(new Bullet());
    });

    //----------TANK BULLET CLASS--------------------
    class Bullet{        
        constructor(){  
        this.BulletOfTankSound = new Audio();
        this.BulletOfTankSound.src = 'TankShooting/AudioShootingTank.mp3';
        this.radius = 5;
        this.angle = angleOfTankGun;
        this.x = tank.position.getX();
        this.y = tank.position.getY();
        this.speed = 10;
        }
        Update(){
            if(bullets.push()){
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            }
        }
        Draw(){
            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }  

    //----------ENEMIES BULLETS CLASSES--------------------
    class FirstAlphaSniperEnemyBullets{
        constructor(){
            this.enemyBulletSound = new Audio();
            this.enemyBulletSound.src = 'EnemyShooting/Sniper_Shot.mp3';
            this.radius = 5;
            this.angle = FirstAlphaSniperEnemyAngle;
            this.x = FirstAlphaSniperEnemy.position.getX();
            this.y = FirstAlphaSniperEnemy.position.getY();
            this.speed = 3;
        }
        Update(){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        Draw(){
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }    

    class SecondAlphaSniperEnemyBullets{
        constructor(){
            this.enemyBulletSound = new Audio();
            this.enemyBulletSound.src = 'EnemyShooting/Sniper_Shot.mp3';
            this.radius = 5;
            this.angle = SecondAlphaSniperEnemyAngle;
            this.x = SecondAlphaSniperEnemy.position.getX();
            this.y = SecondAlphaSniperEnemy.position.getY();
            this.speed = 3;
        }
        Update(){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        Draw(){
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }
    class ThirdAlphaSniperEnemyBullets{
        constructor(){
            this.enemyBulletSound = new Audio();
            this.enemyBulletSound.src = 'EnemyShooting/Sniper_Shot.mp3';
            this.radius = 5;
            this.angle = ThirdAlphaSniperEnemyAngle;
            this.x = ThirdAlphaSniperEnemy.position.getX();
            this.y = ThirdAlphaSniperEnemy.position.getY();
            this.speed = 3;
        }
        Update(){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        Draw(){
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }
    class FourthAlphaSniperEnemyBullets{
        constructor(){
            this.enemyBulletSound = new Audio();
            this.enemyBulletSound.src = 'EnemyShooting/Sniper_Shot.mp3';
            this.radius = 5;
            this.angle = FourthAlphaSniperEnemyAngle;
            this.x = FourthAlphaSniperEnemy.position.getX();
            this.y = FourthAlphaSniperEnemy.position.getY();
            this.speed = 3;
        }
        Update(){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        Draw(){
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }
    class FifthAlphaSniperEnemyBullets{
        constructor(){
            this.enemyBulletSound = new Audio();
            this.enemyBulletSound.src = 'EnemyShooting/Sniper_Shot.mp3';
            this.radius = 5;
            this.angle = FifthAlphaSniperEnemyAngle;
            this.x = FifthAlphaSniperEnemy.position.getX();
            this.y = FifthAlphaSniperEnemy.position.getY();
            this.speed = 3;
        }
        Update(){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        Draw(){
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
            context.fill();
        }
    }

    //--------------------SUICIDE ENEMY CLASS--------------------
    class SuicideEnemy{
        constructor(x , y , radius , velocity , suicideEnemyAngle){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angle = suicideEnemyAngle;
            this.velocity = velocity;
            this.deathSoundOriginal = new Audio();
            this.deathSoundOriginal.src = 'DeathSounds/deathh.wav';
            this.deathSoundOriginal_1 = new Audio();
            this.deathSoundOriginal_1.src = 'DeathSounds/die1.wav';
            this.deathSoundOriginal_2 = new Audio();
            this.deathSoundOriginal_2.src = 'DeathSounds/die2.wav';
            this.deathSoundOriginal_3 = new Audio();
            this.deathSoundOriginal_3.src = 'DeathSounds/pain1.wav';
            this.deathSoundOriginal_4 = new Audio();
            this.deathSoundOriginal_4.src = 'DeathSounds/pain2.wav';
            this.deathSoundOriginal_5 = new Audio();
            this.deathSoundOriginal_5.src = 'DeathSounds/pain3.wav';
            this.deathSoundOriginal_6 = new Audio();
            this.deathSoundOriginal_6.src = 'DeathSounds/pain4.wav';
            this.deathSoundOriginal_7 = new Audio();
            this.deathSoundOriginal_7.src = 'DeathSounds/pain5.wav';
            this.deathSoundOriginal_8 = new Audio();
            this.deathSoundOriginal_8.src = 'DeathSounds/pain5.wav';
            this.deathSoundOriginal_9 = new Audio();
            this.deathSoundOriginal_9.src = 'DeathSounds/painh.wav';
            this.deathSoundOriginal_10 = new Audio();
            this.deathSoundOriginal_10.src = 'DeathSounds/paino.wav';
            var tracks = ['DeathSounds/deathh.wav' , 'DeathSounds/die1.wav' , 'DeathSounds/die2.wav' , 
            'DeathSounds/pain1.wav' , 'DeathSounds/pain2.wav' , 'DeathSounds/pain3.wav' , 'DeathSounds/pain4.wav' ,
            'DeathSounds/pain5.wav' , 'DeathSounds/pain6.wav' , 'DeathSounds/painh.wav' , 'DeathSounds/paino.wav'];
            var track = tracks[Math.floor(Math.random() * tracks.length)];
            this.officielDeathSound = new Audio();
            this.officielDeathSound.src = track;
        }
        Update(){
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        Draw(){
            context.beginPath();
            context.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
            context.drawImage(serbian_flag , this.x - this.radius, this.y - this.radius, 50, 50);
            context.stroke();
        }
    }


    //--------------------SUICIDE ENEMY FUNCTION--------------------
    function SuicideEnemyFunc(){
        var serbian_flag = new Image();
        serbian_flag.src = "EnemiesSkins/serbian_flag.png";
        const radius = 25;
        let x ,y;
        x = 0;
        y = Math.random() * canvas.height;
        SuicideEnemyAngle = Math.atan2(tank.position.getY() - y , tank.position.getX() - x);
        const velocity = {
            x : Math.cos(SuicideEnemyAngle) * 5,
            y : Math.sin(SuicideEnemyAngle) * 5   
        }
        if(frames % 50 == 0) enemies.push(new SuicideEnemy(x , y , radius , velocity));   
    }
    
    //---------------------------------ALPHA SNIPER ENEMIES FUNCTIONS--------------------------------
    function FirstAlphaSniperEnemyFunction(){
        if(isDeadFirstEnemy) return;
        FirstAlphaSniperEnemy_DX = tank.position.getX() - FirstAlphaSniperEnemy.position.getX();
        FirstAlphaSniperEnemy_DY = tank.position.getY() - FirstAlphaSniperEnemy.position.getY();
        FirstAlphaSniperEnemyAngle = Math.atan2(FirstAlphaSniperEnemy_DY , FirstAlphaSniperEnemy_DX);
        if(frames % 100  == 0) {
            enemyBullets.push(new FirstAlphaSniperEnemyBullets);
        }
    }
    function SecondAlphaSniperEnemyFunction(){
        if(isDeadSecondEnemy) return;
        SecondAlphaSniperEnemy_DX = tank.position.getX() - SecondAlphaSniperEnemy.position.getX();
        SecondAlphaSniperEnemy_DY = tank.position.getY() - SecondAlphaSniperEnemy.position.getY();
        SecondAlphaSniperEnemyAngle = Math.atan2(SecondAlphaSniperEnemy_DY , SecondAlphaSniperEnemy_DX);
        if(frames % 110  == 0) {
            enemyBullets.push(new SecondAlphaSniperEnemyBullets);
        }
    }
    function ThirdAlphaSniperEnemyFunction(){
        if(isDeadThirdEnemy) return;
        ThirdAlphaSniperEnemy_DX = tank.position.getX() - ThirdAlphaSniperEnemy.position.getX();
        ThirdAlphaSniperEnemy_DY = tank.position.getY() - ThirdAlphaSniperEnemy.position.getY();
        ThirdAlphaSniperEnemyAngle = Math.atan2(ThirdAlphaSniperEnemy_DY , ThirdAlphaSniperEnemy_DX);
        if(frames % 50  == 0) {
            enemyBullets.push(new ThirdAlphaSniperEnemyBullets);
        }
    }
    function FourthAlphaSniperEnemyFunction(){
        if(isDeadFourthEnemy) return;
        FourthAlphaSniperEnemy_DX = tank.position.getX() - FourthAlphaSniperEnemy.position.getX();
        FourthAlphaSniperEnemy_DY = tank.position.getY() - FourthAlphaSniperEnemy.position.getY();
        FourthAlphaSniperEnemyAngle = Math.atan2(FourthAlphaSniperEnemy_DY , FourthAlphaSniperEnemy_DX);
        if(frames % 120  == 0) {
            enemyBullets.push(new FourthAlphaSniperEnemyBullets);
        }
    }
    function FifthAlphaSniperEnemyFunction(){
        if(isDeadFifthEnemy) return;
        FifthAlphaSniperEnemy_DX = tank.position.getX() - FifthAlphaSniperEnemy.position.getX();
        FifthAlphaSniperEnemy_DY = tank.position.getY() - FifthAlphaSniperEnemy.position.getY();
        FifthAlphaSniperEnemyAngle = Math.atan2(FifthAlphaSniperEnemy_DY , FifthAlphaSniperEnemy_DX);
        if(frames % 130  == 0) {
            enemyBullets.push(new FifthAlphaSniperEnemyBullets);
        }
    }

    //----------KEYBOARD PRESSED
    document.body.addEventListener("keydown" , function(event){
        switch(event.keyCode){
            
            case 87:
                thrusting = true;
                break;
            case 65:
                turningLeft = true;
                break;
            case 68:
                turningRight = true;
                break;
            default: 
                    break;
        }
    });

    //----------KEYBOARD RELEASED
    document.body.addEventListener("keyup" , function(event){
        switch(event.keyCode){
            case 87:
                thrusting = false;
                break;
            case 65:
                turningLeft = false;
                break;
            case 68:
                turningRight = false;
                break;
            
            default: 
                    break;
        }
    });

    //---------------UPDATE FUNCTION -----|----- REQUEST ANIMATION FRAME FUNCTION -----|-----
    function update(){
        context.clearRect(0 , 0 , width , height);
        context.drawImage(background , 0 , 0 , width , height);
        
        if(turningLeft) angleOfTankRotation -= 0.029;

        if(turningRight) angleOfTankRotation += 0.029;

        thrust.setAngle(angleOfTankRotation);

        if(thrusting) thrust.setLength(0.12);
        if(!thrusting) thrust.setLength(0);

        tank.accelerate(thrust);
        tank.update();
        context.save();
        context.translate(tank.position.getX(), tank.position.getY());
        context.rotate(angleOfTankRotation);
        context.beginPath();
        context.arc(0 , 0 , 10 , 0 , Math.PI * 2 , false);
        context.fillStyle = 'white';
        context.moveTo(20, -15);
        context.lineTo(-20, -15);
        context.lineTo(-20, 15);
        context.lineTo(20, 15);
        context.fill();
        context.lineTo(20, -15);
        context.strokeStyle = '#0FFF50';
        context.stroke();
        context.fill();
        
        context.restore();

        if(tank.position.getX() > width) tank.position.setX(0);
        
        if(tank.position.getX() < 0) tank.position.setX(width);
        
        if(tank.position.getY() > height) tank.position.setY(0);
        
        if(tank.position.getY() < 0) tank.position.setY(height);

        context.save();
        context.translate(tank.position.getX(), tank.position.getY());
        context.rotate(angleOfTankGun);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = 'red';
        context.stroke();
        context.restore();  

        //-----------1-----------FIRST ALPHA SNIPER ENEMY DRAWING CORE
        context.save();
        context.translate(FirstAlphaSniperEnemy.position.getX() , FirstAlphaSniperEnemy.position.getY());
        context.rotate(FirstAlphaSniperEnemyAngle);
        context.beginPath();
        context.arc(0 , 0 , RADIUS_ALPHA_SNIPER_ENEMY , 0 , Math.PI * 2 , false);
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.restore();

        //-----------1-----------FIRST ALPHA SNIPER ENEMY GUN
        context.save();
        context.translate(FirstAlphaSniperEnemy.position.getX(), FirstAlphaSniperEnemy.position.getY());
        context.rotate(FirstAlphaSniperEnemyAngle);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.restore();  

        //----------------2-----------------SECOND ALPHA SNIPER ENEMY DRAWING CORE
        context.save();
        context.translate(SecondAlphaSniperEnemy.position.getX() , SecondAlphaSniperEnemy.position.getY());
        context.rotate(SecondAlphaSniperEnemyAngle);
        context.beginPath();
        context.arc(0 , 0 , RADIUS_ALPHA_SNIPER_ENEMY , 0 , Math.PI * 2 , false);
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.stroke();
        context.restore();

        //----------------2------------------SECOND ALPHA SNIPER ENEMY GUN
        context.save();
        context.translate(SecondAlphaSniperEnemy.position.getX(), SecondAlphaSniperEnemy.position.getY());
        context.rotate(SecondAlphaSniperEnemyAngle);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.restore();  

        //-------------------3------------------THIRD ALPHA SNIPER ENEMY DRAWING CORE
        context.save();
        context.translate(ThirdAlphaSniperEnemy.position.getX() , ThirdAlphaSniperEnemy.position.getY());
        context.rotate(ThirdAlphaSniperEnemyAngle);
        context.beginPath();
        context.arc(0 , 0 , RADIUS_ALPHA_SNIPER_ENEMY , 0 , Math.PI * 2 , false);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.restore();

        //------------------3-------------------THIRD ALPHA SNIPER ENEMY GUN
        context.save();
        context.translate(ThirdAlphaSniperEnemy.position.getX(), ThirdAlphaSniperEnemy.position.getY());
        context.rotate(ThirdAlphaSniperEnemyAngle);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.restore();  


        //------------------4----------------------FOURTH ALPHA SNIPER ENEMY DRAWING CORE
        context.save();
        context.translate(FourthAlphaSniperEnemy.position.getX() , FourthAlphaSniperEnemy.position.getY());
        context.rotate(FourthAlphaSniperEnemyAngle);
        context.beginPath();
        context.arc(0 , 0 , RADIUS_ALPHA_SNIPER_ENEMY , 0 , Math.PI * 2 , false);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.restore();

        //-----------------4------------------------FOURTH ALPHA SNIPER ENEMY ENEMY GUN
        context.save();
        context.translate(FourthAlphaSniperEnemy.position.getX(), FourthAlphaSniperEnemy.position.getY());
        context.rotate(FourthAlphaSniperEnemyAngle);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.restore();  


        //-----------------------5---------------------FIFTH ALPHA SNIPER ENEMY DRAWING CORE
        context.save();
        context.translate(FifthAlphaSniperEnemy.position.getX() , FifthAlphaSniperEnemy.position.getY());
        context.rotate(FifthAlphaSniperEnemyAngle);
        context.beginPath();
        context.arc(0 , 0 , RADIUS_ALPHA_SNIPER_ENEMY , 0 , Math.PI * 2 , false);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.restore();

        //--------------------5-------------------------FIFTH ALPHA SNIPER ENEMY GUN
        context.save();
        context.translate(FifthAlphaSniperEnemy.position.getX(), FifthAlphaSniperEnemy.position.getY());
        context.rotate(FifthAlphaSniperEnemyAngle);
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(30, -2);
        context.moveTo(0 , 0);
        context.lineTo(0 , 0);
        context.moveTo(0 , 2);
        context.lineTo(30 , 2);
        context.moveTo(30 , 2);
        context.lineTo(30 , -2);
        context.moveTo(0 , -2);
        context.lineTo(0 , 2);
        context.strokeStyle = '#FFFFFF'
        context.stroke();
        context.restore();

        //DRAWING AND UPDATING BULLETS OF TANK
        bullets.forEach((bullet , bullet_index) => {
            bullet.Update();
            bullet.Draw();
            if(!bullet.BulletOfTankSound.ended){
                bullet.BulletOfTankSound.play();
            }else bullet.BulletOfTankSound.pause();
            if(bullet.x + bullet.radius < 0 || 
                bullet.y + bullet.radius < 0 ||
                bullet.y - bullet.radius > canvas.height ||
                bullet.x - bullet.radius > canvas.width ){
                setTimeout(() => {
                    bullets.splice(bullet_index , 1);
                } , 0)
            }
            //TANK'S BULLET COLLISION WITH ALPHA ENEMIES
            const distance_first_enemy = Math.hypot(FirstAlphaSniperEnemy.position.getX() - bullet.x , FirstAlphaSniperEnemy.position.getY() - bullet.y);
            const distance_second_enemy = Math.hypot(SecondAlphaSniperEnemy.position.getX() - bullet.x , SecondAlphaSniperEnemy.position.getY() - bullet.y);
            const distance_third_enemy = Math.hypot(ThirdAlphaSniperEnemy.position.getX() - bullet.x , ThirdAlphaSniperEnemy.position.getY() - bullet.y);
            const distance_fourth_enemy = Math.hypot(FourthAlphaSniperEnemy.position.getX() - bullet.x , FourthAlphaSniperEnemy.position.getY() - bullet.y);
            const distance_fifth_enemy = Math.hypot(FifthAlphaSniperEnemy.position.getX() - bullet.x , FifthAlphaSniperEnemy.position.getY() - bullet.y);
            var rangleOfCollision = (RADIUS_ALPHA_SNIPER_ENEMY - Math.sqrt(2 * RADIUS_ALPHA_SNIPER_ENEMY ^ 2));
            if(distance_first_enemy - bullet.radius - rangleOfCollision < 1){
                counterFirstEnemyDamage++;
                if(counterFirstEnemyDamage === 15){
                    isDeadFirstEnemy = true;
                    if(FirstEnemyTankShot.ended) FirstEnemyTankShot.pause();
                    else FirstEnemyTankShot.play();
                    FirstAlphaSniperEnemy.position.setX(-150);
                    FirstAlphaSniperEnemy.position.setY(-100);
                    killedEnemiesCounter++;
                }
            }
            if(distance_second_enemy - bullet.radius - rangleOfCollision < 1){
                counterSecondEnemyDamage++;
                if(counterSecondEnemyDamage === 15){
                    isDeadSecondEnemy = true;
                    if(SecondEnemyTankShot.ended) SecondEnemyTankShot.pause();
                    else SecondEnemyTankShot.play();
                    SecondAlphaSniperEnemy.position.setX(-150);
                    SecondAlphaSniperEnemy.position.setY(-100);
                    killedEnemiesCounter++;
                }
            }
            if(distance_third_enemy - bullet.radius - rangleOfCollision < 1){
                counterThirdEnemyDamage++;
                if(counterThirdEnemyDamage === 15){
                    isDeadThirdEnemy = true;
                    if(ThirdEnemyTankShot.ended) ThirdEnemyTankShot.pause();
                    else ThirdEnemyTankShot.play();
                    ThirdAlphaSniperEnemy.position.setX(-150);
                    ThirdAlphaSniperEnemy.position.setY(-100);
                    killedEnemiesCounter++;
                }
            }
            if(distance_fourth_enemy - bullet.radius - rangleOfCollision < 1){
                counterFourthEnemyDamage++;
                if(counterFourthEnemyDamage === 15){
                    isDeadFourthEnemy = true;
                    if(FourthEnemyTankShot.ended) FourthEnemyTankShot.pause();
                    else FourthEnemyTankShot.play();
                    FourthAlphaSniperEnemy.position.setX(-150);
                    FourthAlphaSniperEnemy.position.setY(-100);
                    killedEnemiesCounter++;
                }
            }
            if(distance_fifth_enemy - bullet.radius - rangleOfCollision < 1){
                counterFifthEnemyDamage++;
                if(counterFifthEnemyDamage === 15){
                    isDeadFifthEnemy = true;
                    if(FifthEnemyTankShot.ended) FifthEnemyTankShot.pause();
                    else FifthEnemyTankShot.play();
                    FifthAlphaSniperEnemy.position.setX(-150);
                    FifthAlphaSniperEnemy.position.setY(-100);
                    killedEnemiesCounter++;
                }
            }
            if(isDeadFirstEnemy == true && isDeadSecondEnemy == true && isDeadThirdEnemy == true &&
               isDeadFourthEnemy == true && isDeadFifthEnemy == true) {
                document.getElementById("endScreenId").style.display = "block";
                document.getElementById("endScreenBtn").style.display = "block";
                document.getElementById("backToMenuBtn").style.display = "block";
                document.getElementById("endScreenId").innerHTML = "Victory! Enemies Killed : " + killedEnemiesCounter;
                pause();
            }
        })

        //DRAWING AND UPDATING ENEMY BULLETS
        enemyBullets.forEach((enemyBullet , enemyBullet_index) => {
            enemyBullet.Update();
            enemyBullet.Draw();
            if(!enemyBullet.enemyBulletSound.ended){
                enemyBullet.enemyBulletSound.play();
            }else enemyBullet.enemyBulletSound.pause();
            if(enemyBullet.x + enemyBullet.radius < 0 || 
                enemyBullet.y + enemyBullet.radius < 0 ||
                enemyBullet.y - enemyBullet.radius > canvas.height ||
                enemyBullet.x - enemyBullet.radius > canvas.width ){
                setTimeout(() => {
                    enemyBullets.splice(enemyBullet_index , 1);
                } , 0)
            }
            //ENEMY BULLET COLLISION WITH TANK
            const distance = Math.hypot(tank.position.getX() - enemyBullet.x , tank.position.getY() - enemyBullet.y);
            var rangleOfCollision = (25 - Math.sqrt(2 * 25^2));  
            if(distance - enemyBullet.radius - rangleOfCollision < 1){
                document.getElementById("endScreenId").style.display = "block";
                document.getElementById("endScreenBtn").style.display = "block";
                document.getElementById("backToMenuBtn").style.display = "block";
                gameOverSound.play();
                tank.position.setX(-100);
                tank.position.setY(-150);
                document.getElementById("endScreenId").innerHTML = "Enemies Killed : " + killedEnemiesCounter;
                pause();
            }
            //ENEMY BULLET COLLISION WITH TANK BULLET
            bullets.forEach((bullet) => {
                const distance_between_enemy_tank_bullets = 
                Math.hypot(enemyBullet.x - bullet.x , enemyBullet.y - bullet.y);
                if(distance_between_enemy_tank_bullets - enemyBullet.radius - bullet.radius < 1){
                        bullet.angle = -1*(bullet.angle);
                        enemyBullet.angle = -1*(enemyBullet.angle);
                }
            })
        })

        //DRAWING AND UPDATING SUICIDE ENEMY AND BULLET COLLISION
        SuicideEnemyArr.forEach((suicide_enemy , suicide_enemy_index) => {
            suicide_enemy.Update();
            suicide_enemy.Draw();
            const distance = Math.hypot(tank.position.getX() - suicide_enemy.x , tank.position.getY() - suicide_enemy.y);
            var rangleOfCollision = (25 - Math.sqrt(2 * 25^2));  
            if(distance - suicide_enemy.radius - rangleOfCollision < 1){
                document.getElementById("endScreenId").style.display = "block";
                document.getElementById("endScreenBtn").style.display = "block";
                document.getElementById("backToMenuBtn").style.display = "block";
                gameOverSound.play();
                tank.position.setX(-100);
                tank.position.setY(-150);
                document.getElementById("endScreenId").innerHTML = "Enemies Killed : " + killedEnemiesCounter;
                pause();
            }
            if(suicide_enemy.x + suicide_enemy.radius < 0 || 
                suicide_enemy.y + suicide_enemy.radius < 0 ||
                suicide_enemy.y - suicide_enemy.radius > canvas.height ||
                suicide_enemy.x - suicide_enemy.radius > canvas.width ){
                setTimeout(() => {
                    SuicideEnemyArr.splice(suicide_enemy_index , 1);
                } , 0)
            }

            //---------------TANK BULLETS COLLIDING WITH SUICIDE ENEMIES---------------
            bullets.forEach((bullet , bullet_index) => {
                const distance = Math.hypot(bullet.x - suicide_enemy.x , bullet.y - suicide_enemy.y);
                if(distance - suicide_enemy.radius - bullet.radius < 1){
                    setTimeout(() => {        
                        if(!suicide_enemy.deathSoundSuicideEnemy.ended()) suicide_enemy.deathSoundSuicideEnemy.play();
                        else suicide_enemy.deathSoundSuicideEnemy.pause();
                        bullets.splice(bullet_index , 1);
                        SuicideEnemyArr.splice(suicide_enemy_index , 1);
                    } , 0) 
                }
            })
        })
        
        //DRAWING AND UPDATING ENEMY MOOVING AND BULLET COLLISION
        enemies.forEach((enemy , enemy_index) =>{
            enemy.Update();
            enemy.Draw();
            const distance = Math.hypot(tank.position.getX() - enemy.x , tank.position.getY() - enemy.y);
            var rangleOfCollision = (25 - Math.sqrt(2 * 25^2));  
            if(distance - enemy.radius - rangleOfCollision < 1){
                document.getElementById("endScreenId").style.display = "block";
                document.getElementById("endScreenBtn").style.display = "block";
                document.getElementById("backToMenuBtn").style.display = "block";
                gameOverSound.play();
                tank.position.setX(-100);
                tank.position.setY(-150);
                document.getElementById("endScreenId").innerHTML = "Enemies Killed : " + killedEnemiesCounter;
                pause();
            }
            if(enemy.x + enemy.radius < 0 || 
                enemy.y + enemy.radius < 0 ||
                enemy.y - enemy.radius > canvas.height ||
                enemy.x - enemy.radius > canvas.width ){
                    setTimeout(() => {
                    enemies.splice(enemy_index , 1);
                    } , 0)
                }
            bullets.forEach((bullet , bullet_index) => {
            const distance = Math.hypot(bullet.x - enemy.x , bullet.y - enemy.y);
            if(distance - enemy.radius - bullet.radius < 1){
                setTimeout(() => {
                    if(enemy.officielDeathSound.ended) enemy.officielDeathSound.pause();
                    else enemy.officielDeathSound.play();
                    enemies.splice(enemy_index , 1);
                    bullets.splice(bullet_index , 1);
                  } , 0) 
                }
            })
        })

        frames++;
        SuicideEnemyFunc();
        FirstAlphaSniperEnemyFunction();
        SecondAlphaSniperEnemyFunction();
        ThirdAlphaSniperEnemyFunction();
        FourthAlphaSniperEnemyFunction();
        FifthAlphaSniperEnemyFunction();
        requestAnimationFrame(update);  
    }
}

