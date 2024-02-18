package cityfarm.api.calendar;

import cityfarm.api.animals.AnimalCustom;
import cityfarm.api.enclosure.Enclosure;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.data.annotation.Id;
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
    @Id
    private final String id;

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
        if (from.isBefore(start) || to.isAfter(end)) {
            return List.of(new EventInstance(start, end, this));
        } else {
            return List.of();
        }
    }

    @JsonCreator
    @PersistenceCreator
    public EventOnce(@JsonProperty("start") @NonNull ZonedDateTime start, @JsonProperty("end") @Nullable ZonedDateTime end, @JsonProperty("all_day") @NonNull Boolean all_day,
                     @JsonProperty("title") @NonNull String title, @JsonProperty("description") @Nullable String description, @JsonProperty("_id") @Nullable String id,
                     @JsonProperty("enclosures") @Nullable List<Enclosure> enclosures, @JsonProperty("animals") @Nullable List<AnimalCustom> animals, @JsonProperty("people") @Nullable List<String> attachedPeople) {
        if (end == null && !all_day) {
            throw new IllegalArgumentException("If end isn't present, the event must be marked as all day");
        }
        
        this.start = start;
        this.end = end;
        this.all_day = all_day;
        this.title = title;
        this.description = description;
        this.enclosures = enclosures;
        this.animals = animals;
        this.attachedPeople = attachedPeople;
        this.id = Objects.requireNonNullElseGet(id, () -> UUID.randomUUID().toString());
    }
}
