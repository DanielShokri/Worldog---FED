<template>
  <div class="fm-card">
    <div class="fm-card-header">
      <img src="https://i.pinimg.com/originals/3e/9b/50/3e9b50f473182f34b86dc00d80ddf843.jpg" alt />
    </div>
    <div class="fm-card-content">
      <div class="title">
        <a href>This is the title!</a>
      </div>
      <div class="summary">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="continue">
        <a href="#">continue &rarr;</a>
      </div>
    </div>
    <div class="fm-card-footer">
      <div class="by">
        <a href="#">
          made with
          <span style="color: crimson; font-size: 20px;">&hearts;</span> by mhdmhsni
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
//variables
$card-border-radius: 2px;
$card-width: 320px;
$card-height: 400px;

* {
  transition: all 0.5s;
}

body {
  background: #0cc;
}

.container {
  width: 60%;
  margin: auto;
  text-align: center;
  color: white;
  margin-top: 30px;

  a {
    text-decoration: none;
    font-style: oblique;
    color: #333;

    &:hover {
      text-decoration: underline;
    }
  }
}

.fm-card {
  position: relative;
  width: $card-width;
  height: $card-height;
  margin: auto;
  background: #ffffff;
//   box-shadow: 0px 4px 8px 0px rgba(23, 23, 23, 0.2);
  border-radius: $card-border-radius;
}

.fm-card-header {
  width: 100%;
  height: 40%;
  background-color: royalblue;
  border-top-left-radius: $card-border-radius;
  border-top-right-radius: $card-border-radius;
  overflow: hidden;

  img {
    max-width: 100%;
  }

  &:hover img {
    transform: scale(1.2);
    opacity: 0.8;
    cursor: pointer;
  }

  &:after {
    content: "";
    position: absolute;
    left: 10%;
    top: 35%;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid #fff;
    transform: rotate(-90deg);
  }
}

.fm-card-content {
  position: relative;
  max-width: 100%;
  height: 50%;
  padding: 20px;

  .title a {
    text-decoration: none;
    color: #232323;
    font-weight: bold;

    &:hover {
      color: dodgerblue;
    }
  }

  .summary p {
    color: #555;
    font-size: 14px;
    overflow-wrap: break-word;
    text-align: left;
    max-width: 100ch;
  }

  .continue a {
    text-decoration: none;
    color: dodgerblue;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.fm-card-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: #f9f9f9;
  border-bottom-left-radius: $card-border-radius;
  border-bottom-right-radius: $card-border-radius;

  .by {
    padding-left: 20px;

    a {
      text-decoration: none;
      color: #777;
      font-size: 14px;

      &:hover {
        color: dodgerblue;
      }
    }
  }
}
</style>
