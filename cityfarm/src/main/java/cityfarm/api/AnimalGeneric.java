package cityfarm.api;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.time.ZonedDateTime;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Cow.class, name = "cow"),
        @JsonSubTypes.Type(value = Sheep.class, name = "sheep"),
        @JsonSubTypes.Type(value = Chicken.class, name = "chicken")
})
public abstract class AnimalGeneric {
    /**
     * Specific Animal's name, e.g. "Alice"
     */
    @Nullable
    public String name;
    /**
     * Optional String that contains the ID of the Animal's mother.
     */
    @Nullable
    public String mother;
    /**
     * Optional String that contains the ID of the Animal's father.
     */
    @Nullable
    public String father;

    /**
     * Optional String that contains the breed of an animal
     * (perhaps make into an enum or something later on)
     */
    @Nullable
    public String breed;
    /**
     * Boolean that reflects whether the animal is alive or dead. Dead animals don't need to show in the UI but may need to be in the database.
     * e.g. an Animal may have a dead mother who will still need to be in the database, so we can fetch the name
     */
    @NonNull
    public Boolean alive;
    /**
     * Boolean that identifies the sex of an animal (true for male, false for female)
     */
    @NonNull
    public Boolean male;
    /**
     * Date of Birth of the animal (date of hatching for birds)
     */
    @NonNull
    public ZonedDateTime dateOfBirth;

    public AnimalGeneric(@Nullable String name, @Nullable String mother, @Nullable String father,@Nullable String breed, @NonNull Boolean alive, @NonNull Boolean male, @NonNull ZonedDateTime dateOfBirth) {
        this.name = name;
        this.mother = mother;
        this.father = father;
        this.breed = breed;
        this.alive = alive;
        this.male = male;
        this.dateOfBirth = dateOfBirth;
    }

    public AnimalGeneric() {
    }
}

