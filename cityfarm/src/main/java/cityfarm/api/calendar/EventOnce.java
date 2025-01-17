package cityfarm.api.calendar;

import cityfarm.api.animals.AnimalCustom;
import cityfarm.api.enclosure.Enclosure;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@JsonTypeName("once")
@Document("events")
public class EventOnce extends Event {
    public ZonedDateTime start;
    public ZonedDateTime end;

    @Override
    public String get_id() {
        return id;
    }

    @Override
    public List<EventInstance> nextOccurences(@Nullable ZonedDateTime from, @Nullable Integer num) {
        return List.of(new EventInstance(start, end, this));
    }

    @Override
    public List<EventInstance> occurencesBetween(@NonNull ZonedDateTime from, @NonNull ZonedDateTime to) {
        if (from.isBefore(start) && to.isAfter(end)) {
            return List.of(new EventInstance(start, end, this));
        } else {
            return List.of();
        }
    }

    @JsonCreator
    @PersistenceCreator
    public EventOnce(@JsonProperty("start") @NonNull ZonedDateTime start, @JsonProperty("end") @Nullable ZonedDateTime end, @JsonProperty("allDay") @NonNull Boolean allDay,
                     @JsonProperty("title") @NonNull String title, @JsonProperty("description") @Nullable String description, @JsonProperty("_id") @Nullable String id,
                     @JsonProperty("enclosures") @Nullable List<Enclosure> enclosureRefs, @JsonProperty("enclosures") @Nullable List<String> enclosures,
                     @JsonProperty("animals") @Nullable List<AnimalCustom> animalRefs, @JsonProperty("animals") @Nullable List<String> animals,
                     @JsonProperty("farms") @Nullable List<String> farms, @JsonProperty("people") @Nullable List<String> attachedPeople) {
        if (end == null && !allDay) {
            throw new IllegalArgumentException("If end isn't present, the event must be marked as all day");
        }
        
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.title = title;
        this.description = description;
        this.enclosureRefs = enclosureRefs;
        this.animalRefs = animalRefs;
        this.animals = animals;
        this.enclosures = enclosures;
        this.farms = farms;
        this.attachedPeople = attachedPeople;
        this.id = Objects.requireNonNullElseGet(id, () -> UUID.randomUUID().toString());
    }

    @Override
    public String toString() {
        return String.format("Start: %s\nEnd: %s\nAllDay: %s\nTitle: %s\nDescription: %s\nEnclosures: %s\nAnimals: %s\nFarms: %s\nID: %s\n",
                start, end, allDay, title, description, enclosureRefs, animalRefs, farms, get_id());
    }
}
