<template>
  <div>
    <v-file-input
      v-model="rawPhoto"
      accept="image/*"
      label="Select a photo"
      prepend-icon=""
      :prepend-inner-icon="'mdi-camera'"
      outlined
      @change="onFileSelected"
    ></v-file-input>
  </div>
</template>
<script>
export default {
  name: "PhotoInput",
  data() {
    return {
      rawPhoto: null,
      base64Photo: "",
    };
  },
  methods: {
    onFileSelected() {
      if (!this.rawPhoto) return;
      const reader = new FileReader();
      reader.readAsDataURL(this.rawPhoto);
      reader.onload = () => {
        this.base64Photo = reader.result;
        this.$emit("onPhotoSelected", this.base64Photo);
      };
    },
    onDelete() {
      this.rawPhoto = null;
      this.base64Photo = "";
      this.$emit("onPhotoSelected", "");
    },
  },
};
</script>
