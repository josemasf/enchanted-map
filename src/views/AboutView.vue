<template>
  <div>
    <!-- Hero Section -->
    <section class="about-hero">
      <v-container class="py-12">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">About Córdoba Stories</h1>
            <p class="text-h6">
              Bringing the rich history and hidden gems of Córdoba, Spain to life through interactive storytelling.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- Mission Section -->
    <section class="py-12 bg-grey-lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center">
            <div>
              <h2 class="text-h3 mb-6">Our Mission</h2>
              <p class="text-body-1 mb-4">
                At Córdoba Stories, we believe that every corner of this historic city has a tale to tell. Our mission is to uncover these stories and make them accessible to visitors and locals alike through an engaging, interactive experience.
              </p>
              <p class="text-body-1">
                By combining modern technology with deep historical research, we create a bridge between the past and present, allowing you to experience Córdoba in a completely new way.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img
              src="https://images.pexels.com/photos/2549175/pexels-photo-2549175.jpeg"
              max-width="500"
              class="rounded-xl elevation-4"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- The Team Section -->
    <section class="py-12">
      <v-container>
        <h2 class="text-h3 text-center mb-8">Our Team</h2>
        
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card class="team-card">
              <v-img
                src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg"
                height="300"
                cover
              ></v-img>
              <v-card-title>María González</v-card-title>
              <v-card-subtitle>Founder & Historian</v-card-subtitle>
              <v-card-text>
                With a PhD in Spanish History from the University of Córdoba, María brings expert knowledge and passion to every story we tell.
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card class="team-card">
              <v-img
                src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg"
                height="300"
                cover
              ></v-img>
              <v-card-title>Carlos Ruiz</v-card-title>
              <v-card-subtitle>Lead Developer</v-card-subtitle>
              <v-card-text>
                Carlos heads our technical team, crafting the interactive experiences that bring Córdoba's history to life through technology.
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-card class="team-card">
              <v-img
                src="https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg"
                height="300"
                cover
              ></v-img>
              <v-card-title>Sofia Mendez</v-card-title>
              <v-card-subtitle>Content Creator</v-card-subtitle>
              <v-card-text>
                A talented storyteller and journalist, Sofia transforms historical facts into captivating narratives that engage and inspire.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- About Córdoba Section -->
    <section class="py-12 bg-grey-lighten-4">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" order="2" order-md="1">
            <h2 class="text-h3 mb-6">About Córdoba</h2>
            <p class="text-body-1 mb-4">
              Córdoba, a city in southern Spain's Andalusia region, was once the capital of the Islamic Emirate and later the Caliphate of Córdoba, which encompassed most of the Iberian Peninsula.
            </p>
            <p class="text-body-1 mb-4">
              It's known for La Mezquita, an immense mosque dating from 784 A.D., which became a Roman Catholic cathedral in 1236 when Christians conquered the city. The historic center, with its narrow winding streets, is now a UNESCO World Heritage site.
            </p>
            <p class="text-body-1">
              With a rich tapestry of Roman, Islamic, Jewish, and Christian history, Córdoba offers a unique cultural experience that we're passionate about sharing through our interactive map and stories.
            </p>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2" class="d-flex justify-center">
            <v-img
              src="https://images.pexels.com/photos/11432397/pexels-photo-11432397.jpeg"
              max-width="500"
              class="rounded-xl elevation-4"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
    
    <!-- Contact Section -->
    <section class="py-12">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="contact-card">
              <v-card-title class="text-h4 text-center py-6">Contact Us</v-card-title>
              <v-card-text>
                <p class="text-center mb-6">
                  Have questions, suggestions, or want to collaborate? We'd love to hear from you!
                </p>
                
                <v-form>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Name"
                        variant="outlined"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Subject"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Message"
                        variant="outlined"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn
                        color="primary"
                        size="large"
                      >
                        Send Message
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
// No specific script functionality needed for this view
</script>

<style scoped>
.about-hero {
  background-color: var(--color-primary);
  color: white;
}

.team-card, .contact-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
</style>