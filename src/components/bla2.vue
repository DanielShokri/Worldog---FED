<template>
  <main>
    <figure>
      <img src="https://source.unsplash.com/-YMhg0KYgVc/600x300" />
    </figure>
    <section class="content">
      <a href="#">
        <h2 class="title">Thulusdhoo, Maldives</h2>
      </a>
      <p
        class="subtitle"
      >Clem Onojeghuo &nbsp; &bull; &nbsp; 21 May, 2019 &nbsp; &bull; &nbsp; 3 Min Read</p>
      <p>The Caribbean Sea is a sea of the Atlantic Ocean in the tropics of the Western Hemisphere. It has the world's second biggest barrier reef, the Mesoamerican Barrier Reef.</p>
    </section>
    <footer>
      <a href="#">
        <span>Read Article</span>
      </a>
    </footer>
  </main>
</template>


<script>
export default {
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      items: [
        { name: "Tycoon Thai", tag: "Thai" },
        { name: "Ippudo", tag: "Japanese" },
        { name: "Milano", tag: "Pizza" },
        { name: "Tsing Tao", tag: "Chinese" },
        { name: "Frances", tag: "French" },
        { name: "Burma Superstar", tag: "Burmese" },
        { name: "Salt and Straw", tag: "Ice cream" }
      ]
    };
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.items.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    }
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans");

$color: #44a3d9; // #2f559e;

body {
  height: 100vh;

  background-color: #eceff1;
  font-family: "Nunito Sans", sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  max-width: 20rem;
  background: white;
  color: #263238;
//   border-radius: 0.5rem;
  overflow: hidden;

//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  figure {
    padding: 0;
    margin: 0;
    line-height: 0;
    img {
      image-rendering: crisp-edges;
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
  .content {
    padding: 1.5rem;

    a {
      text-decoration: none;
      color: $color;
      h2 {
        font-size: 1.75rem;
        display: inline;
        margin: 0;
        margin-left: -1px;
      }
      &:hover {
        color: darken($color, 10%);
      }
    }
    > p.subtitle {
      display: inline-block;
      font-size: 0.8rem;
      color: #607d8b;
      margin: 0;
      margin-top: 0.25rem;
    }
    > p {
      line-height: 1.25rem;
      font-size: 0.95rem;
      text-align: justify;
      margin: 0;
      margin-top: 1.25rem;
    }
  }
  footer {
    background: rgba($color, 0.1);
    a {
      display: flex;
      border-top: 1px solid rgba(grey, 0.1);
      font-size: 0.9rem;
      padding: 1rem 1.5rem;
      text-decoration: none;
      font-weight: 600;
      color: $color;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      flex-direction: row;
      align-items: center;
      &:hover {
        color: darken($color, 10%);
        background: rgba($color, 0.2);
      }
      &::after {
        content: " → ";
        margin-left: auto;
        transition: 0.3s;
        font-size: 1.25rem;
      }
    }
  }
}
</style>
